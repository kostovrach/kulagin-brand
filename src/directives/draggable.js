export default {
    mounted(el, binding) {
        setupDraggable(el, binding.value);
    },
    updated(el, binding) {
        if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
            el._draggableDestroy?.();
            setupDraggable(el, binding.value);
        }
    },
    unmounted(el) {
        el._draggableDestroy?.();
        delete el._draggableDestroy;
        delete el._toggleDraggable;
        delete el._getCurrentPercentage;
    },
};

const INTERACTIVE_TAGS = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'VIDEO'];

function setupDraggable(el, options) {
    initDraggable(el, options);

    const mm = window.matchMedia('(pointer: coarse)');

    function checkPointerType() {
        if (mm.matches) {
            el._toggleDraggable(false);
        } else {
            el._toggleDraggable(true);
        }
    }

    window.addEventListener('resize', checkPointerType, { passive: true });
    mm.addEventListener('change', checkPointerType);

    checkPointerType();

    const oldDestroy = el._draggableDestroy;
    el._draggableDestroy = () => {
        window.removeEventListener('resize', checkPointerType);
        mm.removeEventListener('change', checkPointerType);
        oldDestroy?.();
    };
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
    el.style.zIndex = '5';
    el.style.willChange = 'left, top';
    if (!el.style.left || !el.style.top) {
        el.style.left = (leftPercent / 100) * referenceContainer.offsetWidth + 'px';
        el.style.top = (topPercent / 100) * referenceContainer.offsetHeight + 'px';
    }

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

        const { width, height } = referenceContainer.getBoundingClientRect();
        leftPercent = (finalLeftPx / width) * 100;
        topPercent = (finalTopPx / height) * 100;

        if (options.onPositionChange) {
            options.onPositionChange(leftPercent, topPercent);
        }
    }

    function onResize() {
        if (!dragging) {
            const { width, height } = referenceContainer.getBoundingClientRect();
            el.style.left = (leftPercent / 100) * width + 'px';
            el.style.top = (topPercent / 100) * height + 'px';
        } else {
            containerRect = constraintContainer?.getBoundingClientRect() || null;
            elRect = el.getBoundingClientRect();
        }
    }

    function addListeners() {
        el.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
    }

    function removeListeners() {
        el.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('resize', onResize);
    }

    el._toggleDraggable = (enabled) => {
        if (enabled) {
            addListeners();
            el.style.cursor = 'grab';
        } else {
            removeListeners();
            el.style.cursor = 'auto';
        }
    };

    el._draggableDestroy = () => {
        removeListeners();
        if (frameId) cancelAnimationFrame(frameId);
    };

    el._getCurrentPercentage = () => ({ left: leftPercent, top: topPercent });
}
