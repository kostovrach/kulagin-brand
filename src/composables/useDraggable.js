import { ref } from 'vue';

export function useDraggable(options = {}) {
    const { container = null, axis = 'both', disabled = false, usePercentages = true } = options;

    const elementRef = ref(null);
    const isDragging = ref(false);
    const position = ref({ x: 0, y: 0 });

    let startPos = { x: 0, y: 0 };
    let elementStartPos = { x: 0, y: 0 };
    let containerRect = null;
    let elementRect = null;

    const getContainerBounds = () => {
        if (!container) return null;
        const containerEl =
            typeof container === 'string'
                ? container === 'parent'
                    ? elementRef.value?.parentElement
                    : document.querySelector(container)
                : container;
        if (!containerEl) return null;
        return containerEl.getBoundingClientRect();
    };

    const pixelsToPercentage = (pixels, dimension) => {
        if (!usePercentages) return pixels;
        const containerSize = containerRect
            ? dimension === 'width'
                ? containerRect.width
                : containerRect.height
            : dimension === 'width'
              ? window.innerWidth
              : window.innerHeight;
        return (pixels / containerSize) * 100;
    };

    const percentageToPixels = (percentage, dimension) => {
        if (!usePercentages) return percentage;
        const containerSize = containerRect
            ? dimension === 'width'
                ? containerRect.width
                : containerRect.height
            : dimension === 'width'
              ? window.innerWidth
              : window.innerHeight;
        return (percentage / 100) * containerSize;
    };

    const updatePosition = (clientX, clientY) => {
        if (!elementRef.value) return;

        let deltaX = clientX - startPos.x;
        let deltaY = clientY - startPos.y;

        if (axis === 'x') deltaY = 0;
        if (axis === 'y') deltaX = 0;

        let newX = elementStartPos.x + deltaX;
        let newY = elementStartPos.y + deltaY;

        if (containerRect && elementRect) {
            const minX = containerRect.left;
            const minY = containerRect.top;
            const maxX = containerRect.right - elementRect.width;
            const maxY = containerRect.bottom - elementRect.height;

            newX = Math.max(minX, Math.min(maxX, newX));
            newY = Math.max(minY, Math.min(maxY, newY));
        }

        if (usePercentages) {
            position.value.x = pixelsToPercentage(newX - (containerRect?.left || 0), 'width');
            position.value.y = pixelsToPercentage(newY - (containerRect?.top || 0), 'height');

            elementRef.value.style.left = `${position.value.x}%`;
            elementRef.value.style.top = `${position.value.y}%`;
        } else {
            position.value.x = newX;
            position.value.y = newY;

            elementRef.value.style.left = `${newX}px`;
            elementRef.value.style.top = `${newY}px`;
        }
    };

    // Mouse/touch handlers
    const handleMouseDown = (event) => {
        if (disabled) return;
        event.preventDefault();
        isDragging.value = true;
        startPos.x = event.clientX;
        startPos.y = event.clientY;
        containerRect = getContainerBounds();
        elementRect = elementRef.value.getBoundingClientRect();
        elementStartPos.x = elementRect.left;
        elementStartPos.y = elementRect.top;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        elementRef.value.classList.add('dragging');
    };

    const handleMouseMove = (event) => {
        if (!isDragging.value) return;
        updatePosition(event.clientX, event.clientY);
    };

    const handleMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        elementRef.value?.classList.remove('dragging');
    };

    const handleTouchStart = (event) => {
        if (disabled || event.touches.length > 1) return;
        const touch = event.touches[0];
        event.preventDefault();
        isDragging.value = true;
        startPos.x = touch.clientX;
        startPos.y = touch.clientY;
        containerRect = getContainerBounds();
        elementRect = elementRef.value.getBoundingClientRect();
        elementStartPos.x = elementRect.left;
        elementStartPos.y = elementRect.top;

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        elementRef.value.classList.add('dragging');
    };

    const handleTouchMove = (event) => {
        if (!isDragging.value || event.touches.length > 1) return;
        event.preventDefault();
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
        isDragging.value = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        elementRef.value?.classList.remove('dragging');
    };

    const handleResize = () => {
        if (!elementRef.value || !usePercentages) return;
        containerRect = getContainerBounds();
        elementRef.value.style.left = `${position.value.x}%`;
        elementRef.value.style.top = `${position.value.y}%`;
    };

    const initializeDraggable = () => {
        if (!elementRef.value) return;
        elementRef.value.style.position = containerRect ? 'absolute' : 'fixed';
        elementRef.value.style.cursor = disabled ? 'default' : 'move';
        elementRef.value.style.userSelect = 'none';
        elementRef.value.style.touchAction = 'none';

        elementRef.value.addEventListener('mousedown', handleMouseDown);
        elementRef.value.addEventListener('touchstart', handleTouchStart, { passive: false });
    };

    const setPosition = (x, y) => {
        position.value.x = x;
        position.value.y = y;
        if (!elementRef.value) return;
        if (usePercentages) {
            elementRef.value.style.left = `${x}%`;
            elementRef.value.style.top = `${y}%`;
        } else {
            elementRef.value.style.left = `${x}px`;
            elementRef.value.style.top = `${y}px`;
        }
    };

    const initialize = (el) => {
        elementRef.value = el;
        initializeDraggable();
        if (usePercentages) {
            window.addEventListener('resize', handleResize);
        }
    };

    const destroy = () => {
        if (!elementRef.value) return;
        elementRef.value.removeEventListener('mousedown', handleMouseDown);
        elementRef.value.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        if (usePercentages) {
            window.removeEventListener('resize', handleResize);
        }
    };

    return {
        elementRef,
        isDragging,
        position,
        setPosition,
        initialize,
        destroy,
    };
}
