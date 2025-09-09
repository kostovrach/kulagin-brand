import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useHorizontalScroll(options = {}) {
    const {
        easing = 0.08,
        inertiaDecay = 0.95,
        minInertiaVelocity = 0.1,
        keyboardStepRatio = 0.8,
        wheelSensitivity = 1,
        touchSensitivity = 1,
    } = options;

    const containerRef = ref(null);
    const scrollProgress = ref(0);
    const isScrolling = ref(false);

    let current = 0;
    let target = 0;
    let isAnimating = false;
    let inertiaVelocity = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;
    let touchVelocities = [];
    let rafId = null;

    let lastWheelTime = 0;
    const wheelDebounceTime = 16;

    function animate() {
        if (!containerRef.value) return;

        if (Math.abs(target - current) < 0.5 && Math.abs(inertiaVelocity) > minInertiaVelocity) {
            target += inertiaVelocity;
            inertiaVelocity *= inertiaDecay;
        }

        current += (target - current) * easing;

        const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
        if (current < 0) {
            current = 0;
            inertiaVelocity = 0;
        }
        if (current > maxScroll) {
            current = maxScroll;
            inertiaVelocity = 0;
        }

        containerRef.value.scrollLeft = current;

        updateScrollProgress();

        const needsContinue = Math.abs(target - current) > 0.5 || Math.abs(inertiaVelocity) > minInertiaVelocity;

        if (needsContinue) {
            rafId = requestAnimationFrame(animate);
            isScrolling.value = true;
        } else {
            isAnimating = false;
            isScrolling.value = false;
            inertiaVelocity = 0;
        }
    }

    function startAnimation() {
        if (!isAnimating && containerRef.value) {
            isAnimating = true;
            rafId = requestAnimationFrame(animate);
        }
    }

    function updateScrollProgress() {
        if (!containerRef.value) return;

        const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
        scrollProgress.value = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
    }

    function handleWheel(e) {
        e.preventDefault();

        const now = performance.now();
        if (now - lastWheelTime < wheelDebounceTime) return;
        lastWheelTime = now;

        if (!containerRef.value) return;

        const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
        const delta = (e.deltaY + e.deltaX) * wheelSensitivity;

        target += delta;
        target = Math.max(0, Math.min(target, maxScroll));

        inertiaVelocity = 0;

        startAnimation();
    }

    function handleTouchStart(e) {
        const touch = e.touches[0];
        lastTouchX = touch.clientX;
        lastTouchTime = performance.now();
        touchVelocities = [];
        inertiaVelocity = 0;
    }

    function handleTouchMove(e) {
        e.preventDefault();

        if (!containerRef.value) return;

        const touch = e.touches[0];
        const now = performance.now();
        const deltaX = (lastTouchX - touch.clientX) * touchSensitivity;
        const deltaTime = now - lastTouchTime;

        if (deltaTime > 0) {
            const velocity = deltaX / deltaTime;
            touchVelocities.push({ velocity, time: now });

            touchVelocities = touchVelocities.filter((v) => now - v.time < 100);
        }

        const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
        target += deltaX;
        target = Math.max(0, Math.min(target, maxScroll));

        lastTouchX = touch.clientX;
        lastTouchTime = now;

        startAnimation();
    }

    function handleTouchEnd() {
        if (touchVelocities.length > 0) {
            const avgVelocity = touchVelocities.reduce((sum, v) => sum + v.velocity, 0) / touchVelocities.length;
            inertiaVelocity = avgVelocity * 10;
        }

        touchVelocities = [];
        startAnimation();
    }

    function handleKeydown(e) {
        if (!containerRef.value) return;

        const step = window.innerWidth * keyboardStepRatio;
        let shouldHandle = false;

        switch (e.key) {
            case 'ArrowRight':
                target += step;
                shouldHandle = true;
                break;
            case 'ArrowLeft':
                target -= step;
                shouldHandle = true;
                break;
            case 'Home':
                target = 0;
                shouldHandle = true;
                break;
            case 'End':
                target = containerRef.value.scrollWidth - containerRef.value.clientWidth;
                shouldHandle = true;
                break;
        }

        if (shouldHandle) {
            e.preventDefault();
            const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
            target = Math.max(0, Math.min(target, maxScroll));
            inertiaVelocity = 0;
            startAnimation();
        }
    }

    function scrollTo(position, smooth = true) {
        if (!containerRef.value) return;

        const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
        target = Math.max(0, Math.min(position, maxScroll));

        if (smooth) {
            inertiaVelocity = 0;
            startAnimation();
        } else {
            current = target;
            containerRef.value.scrollLeft = current;
            updateScrollProgress();
        }
    }

    function scrollBy(delta, smooth = true) {
        scrollTo(target + delta, smooth);
    }

    function setupListeners() {
        if (!containerRef.value) return;

        current = containerRef.value.scrollLeft;
        target = current;
        updateScrollProgress();

        containerRef.value.addEventListener('wheel', handleWheel, { passive: false });
        containerRef.value.addEventListener('touchstart', handleTouchStart, { passive: false });
        containerRef.value.addEventListener('touchmove', handleTouchMove, { passive: false });
        containerRef.value.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('keydown', handleKeydown);

        containerRef.value.setAttribute('aria-label', 'Horizontally scrollable content');
        containerRef.value.setAttribute('tabindex', '0');
    }

    function removeListeners() {
        if (!containerRef.value) return;

        containerRef.value.removeEventListener('wheel', handleWheel);
        containerRef.value.removeEventListener('touchstart', handleTouchStart);
        containerRef.value.removeEventListener('touchmove', handleTouchMove);
        containerRef.value.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeydown);
    }

    onMounted(() => {
        nextTick(() => {
            setupListeners();
        });
    });

    onUnmounted(() => {
        removeListeners();
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    });

    return { containerRef, scrollProgress, isScrolling, scrollTo, scrollBy, setupListeners, removeListeners };
}
