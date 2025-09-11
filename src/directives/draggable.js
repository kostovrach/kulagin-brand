export default {
    mounted(el, binding) {
        initDraggable(el, binding.value);
    },
    updated(el, binding) {
        el._draggableCleanup?.();
        initDraggable(el, binding.value);
    },
    unmounted(el) {
        el._draggableCleanup?.();
    },
};

function initDraggable(el, options) {
    if (options === false) return;

    let constraintContainer = null;
    if (options?.container) {
        if (options.container === 'parent') {
            constraintContainer = el.parentElement;
        } else if (typeof options.container === 'string') {
            constraintContainer = document.querySelector(options.container);
        }
    }

    if (options?.left != null) el.style.left = options.left + 'px';
    if (options?.top != null) el.style.top = options.top + 'px';
    el.style.position = 'absolute';
    el.style.zIndex = '5';
    el.style.cursor = 'grab';

    let dragging = false;
    let startX, startY, origX, origY;

    function onPointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'VIDEO'];
        if (interactiveTags.includes(e.target.tagName)) return;

        dragging = true;
        el.classList.add('dragging');

        startX = e.clientX;
        startY = e.clientY;

        origX = parseFloat(el.style.left || 0);
        origY = parseFloat(el.style.top || 0);

        e.preventDefault();
    }

    function onPointerMove(e) {
        if (!dragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = origX + dx;
        let newTop = origY + dy;

        const axis = options?.axis;

        if (axis === 'x') {
            newTop = origY;
        } else if (axis === 'y') {
            newLeft = origX;
        }
        if (constraintContainer) {
            const containerRect = constraintContainer.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();

            const containerLeft = containerRect.left + window.scrollX;
            const containerTop = containerRect.top + window.scrollY;
            const containerRight = containerLeft + containerRect.width;
            const containerBottom = containerTop + containerRect.height;

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
        el.style.cursor = 'grabbing';

        e.preventDefault();
    }

    function onPointerUp() {
        dragging = false;
        el.classList.remove('dragging');
        el.style.cursor = 'grab';
    }

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);

    el._draggableCleanup = () => {
        el.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
    };
}
