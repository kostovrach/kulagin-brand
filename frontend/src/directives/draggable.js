export default {
    mounted(el, binding) {
        initDraggable(el, binding.value);
        setupPointerToggle(el);
    },
    updated(el, binding) {
        if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
            teardownPointerToggle(el);
            el._draggableCleanup?.();
            initDraggable(el, binding.value);
            setupPointerToggle(el);
        }
    },
    unmounted(el) {
        teardownPointerToggle(el);
        el._draggableCleanup?.();
        delete el._draggableCleanup;
        delete el._getCurrentPercentage;
        delete el._enableDrag;
        delete el._disableDrag;
    },
};

const INTERACTIVE_TAGS = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'VIDEO'];

function setupPointerToggle(el) {
    const mm = window.matchMedia('(pointer: coarse)');

    function handle() {
        if (mm.matches) {
            el._disableDrag?.();
            // el.style.pointerEvents = 'none';
        } else {
            // el.style.pointerEvents = '';
            el._enableDrag?.();
        }
    }

    if (typeof mm.addEventListener === 'function') {
        mm.addEventListener('change', handle);
    } else if (typeof mm.addListener === 'function') {
        mm.addListener(handle);
    }

    window.addEventListener('resize', handle, { passive: true });

    handle();

    el._pointerToggle = { mm, handle };
}

function teardownPointerToggle(el) {
    const pt = el._pointerToggle;
    if (!pt) return;
    const { mm, handle } = pt;
    if (mm) {
        if (typeof mm.removeEventListener === 'function') {
            mm.removeEventListener('change', handle);
        } else if (typeof mm.removeListener === 'function') {
            mm.removeListener(handle);
        }
    }
    window.removeEventListener('resize', handle);
    delete el._pointerToggle;
}

function initDraggable(el, options = {}) {
    if (options === false) return;

    let constraintContainer = null;
    let referenceContainer = null;
    if (options.container) {
        if (options.container === 'parent') {
            constraintContainer = el.parentElement;
            referenceContainer = el.parentElement;
        } else if (typeof options.container === 'string') {
            constraintContainer = document.querySelector(options.container);
            referenceContainer = constraintContainer;
        }
    }
    if (!referenceContainer) referenceContainer = el.parentElement;

    let leftPercent = options.left ?? 0;
    let topPercent = options.top ?? 0;

    el.style.position = 'absolute';
    el.style.zIndex = '10';
    el.style.cursor = 'grab';
    el.style.willChange = 'left, top';

    function getReferenceSize() {
        if (referenceContainer === document.documentElement) {
            return { width: window.innerWidth, height: window.innerHeight };
        } else {
            const rect = referenceContainer.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }
    }

    function applyPercentagePosition() {
        const { width, height } = getReferenceSize();
        const leftPx = (leftPercent / 100) * width;
        const topPx = (topPercent / 100) * height;
        el.style.left = leftPx + 'px';
        el.style.top = topPx + 'px';
    }

    function convertToPercentage(leftPx, topPx) {
        const { width, height } = getReferenceSize();
        return {
            left: (leftPx / width) * 100,
            top: (topPx / height) * 100,
        };
    }

    applyPercentagePosition();

    let dragging = false;
    let startX = 0,
        startY = 0,
        origX = 0,
        origY = 0;
    let containerRect = null,
        elRect = null;
    let dx = 0,
        dy = 0;
    let frameId = null;

    function onPointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (INTERACTIVE_TAGS.includes(e.target.tagName)) return;

        dragging = true;
        el.classList.add('dragging');

        startX = e.clientX;
        startY = e.clientY;

        origX = parseFloat(el.style.left) || 0;
        origY = parseFloat(el.style.top) || 0;

        containerRect = constraintContainer?.getBoundingClientRect() || null;
        elRect = el.getBoundingClientRect();

        el.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function onPointerMove(e) {
        if (!dragging) return;

        dx = e.clientX - startX;
        dy = e.clientY - startY;

        if (!frameId) frameId = requestAnimationFrame(updatePosition);

        e.preventDefault();
    }

    function updatePosition() {
        frameId = null;

        let newLeft = origX + dx;
        let newTop = origY + dy;

        const axis = options.axis;
        if (axis === 'x') newTop = origY;
        if (axis === 'y') newLeft = origX;

        if (constraintContainer && containerRect) {
            const containerLeft =
                constraintContainer === document.documentElement ? 0 : containerRect.left + window.scrollX;
            const containerTop =
                constraintContainer === document.documentElement ? 0 : containerRect.top + window.scrollY;
            const containerRight = containerLeft + (containerRect ? containerRect.width : 0);
            const containerBottom = containerTop + (containerRect ? containerRect.height : 0);

            if (axis !== 'y') {
                const minLeft = containerLeft;
                const maxLeft = containerRight - elRect.width;
                newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
            }
            if (axis !== 'x') {
                const minTop = containerTop;
                const maxTop = containerBottom - elRect.height;
                newTop = Math.max(minTop, Math.min(maxTop, newTop));
            }
        }

        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';
    }

    function onPointerUp() {
        if (!dragging) return;

        dragging = false;
        el.classList.remove('dragging');
        el.style.cursor = 'grab';

        if (frameId) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }

        const finalLeftPx = parseFloat(el.style.left) || 0;
        const finalTopPx = parseFloat(el.style.top) || 0;

        const percentages = convertToPercentage(finalLeftPx, finalTopPx);
        leftPercent = percentages.left;
        topPercent = percentages.top;

        if (options.onPositionChange) {
            options.onPositionChange(leftPercent, topPercent);
        }
    }

    function onResize() {
        if (!dragging) {
            applyPercentagePosition();
        } else {
            containerRect = constraintContainer?.getBoundingClientRect() || null;
            elRect = el.getBoundingClientRect();
        }
    }

    function addPointerListeners() {
        if (!el._pointerListenersAdded) {
            el.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove, { passive: false });
            window.addEventListener('pointerup', onPointerUp, { passive: true });
            el._pointerListenersAdded = true;
        }
    }

    function removePointerListeners() {
        if (dragging) {
            onPointerUp();
        }
        if (el._pointerListenersAdded) {
            el.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            el._pointerListenersAdded = false;
        }
    }

    addPointerListeners();

    window.addEventListener('resize', onResize, { passive: true });

    let resizeObserver = null;
    if (referenceContainer !== document.documentElement) {
        resizeObserver = new ResizeObserver(() => {
            if (!dragging) {
                applyPercentagePosition();
            } else {
                containerRect = constraintContainer?.getBoundingClientRect() || null;
                elRect = el.getBoundingClientRect();
            }
        });
        resizeObserver.observe(referenceContainer);
    }

    el._disableDrag = () => {
        removePointerListeners();
        el.style.cursor = 'auto';
    };

    el._enableDrag = () => {
        addPointerListeners();
        el.style.cursor = 'grab';
    };

    el._draggableCleanup = () => {
        removePointerListeners();
        window.removeEventListener('resize', onResize);
        if (resizeObserver) resizeObserver.disconnect();
        if (frameId) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }
    };

    el._getCurrentPercentage = () => ({ left: leftPercent, top: topPercent });
}
