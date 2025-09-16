import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';

export function useHorizontalScroll(options = {}) {
    const {
        easing = 0.08,
        inertiaDecay = 0.95,
        minInertiaVelocity = 0.1,
        keyboardStepRatio = 0.8,
        wheelSensitivity = 1,
        touchSensitivity = 1,
        breakpoint = 768,
    } = options;

    const containerRef = ref(null);
    const scrollProgress = ref(0);
    const isScrolling = ref(false);
    const isDesktop = ref(true);
    const isEnabled = ref(true);

    const isActive = computed(() => isDesktop.value && isEnabled.value);

    let current = 0;
    let target = 0;
    let isAnimating = false;
    let inertiaVelocity = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;
    let touchVelocities = [];
    let rafId = null;
    let lastWheelTime = 0;
    let mediaQuery = null;
    // let resizeObserver = null;

    const wheelDebounceTime = 16;

    function animate() {
        if (!containerRef.value || !isActive.value) return;

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

        if (needsContinue && isActive.value) {
            rafId = requestAnimationFrame(animate);
            isScrolling.value = true;
        } else {
            isAnimating = false;
            isScrolling.value = false;
            inertiaVelocity = 0;
        }
    }

    function startAnimation() {
        if (!isAnimating && containerRef.value && isActive.value) {
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
        if (!isActive.value) return;

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
        if (!isActive.value) return;

        const touch = e.touches[0];
        lastTouchX = touch.clientX;
        lastTouchTime = performance.now();
        touchVelocities = [];
        inertiaVelocity = 0;
    }

    function handleTouchMove(e) {
        if (!isActive.value) return;

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
        if (!isActive.value) return;

        if (touchVelocities.length > 0) {
            const avgVelocity = touchVelocities.reduce((sum, v) => sum + v.velocity, 0) / touchVelocities.length;
            inertiaVelocity = avgVelocity * 10;
        }

        touchVelocities = [];
        startAnimation();
    }

    function handleKeydown(e) {
        if (!isActive.value || !containerRef.value) return;

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

    function handleMediaQueryChange(e) {
        isDesktop.value = e.matches;

        if (!isDesktop.value) {
            stopAnimation();
            resetScrollState();
        } else {
            syncWithNativeScroll();
        }
    }

    function stopAnimation() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        isAnimating = false;
        isScrolling.value = false;
        inertiaVelocity = 0;
    }

    function resetScrollState() {
        scrollProgress.value = 0;
    }

    function syncWithNativeScroll() {
        if (!containerRef.value) return;

        current = containerRef.value.scrollLeft;
        target = current;
        updateScrollProgress();
    }

    function scrollTo(position, smooth = true) {
        if (!containerRef.value || !isActive.value) return;

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

        syncWithNativeScroll();

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

        containerRef.value.removeAttribute('aria-label');
        containerRef.value.removeAttribute('tabindex');
    }

    function setupMediaQuery() {
        mediaQuery = window.matchMedia(`(min-width: ${breakpoint + 1}px)`);
        isDesktop.value = mediaQuery.matches;

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaQueryChange);
        } else {
            mediaQuery.addListener(handleMediaQueryChange);
        }
    }

    function cleanupMediaQuery() {
        if (!mediaQuery) return;

        if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        } else {
            mediaQuery.removeListener(handleMediaQueryChange);
        }
        mediaQuery = null;
    }

    function enable() {
        isEnabled.value = true;
        if (isDesktop.value && containerRef.value) {
            syncWithNativeScroll();
        }
    }

    function disable() {
        isEnabled.value = false;
        stopAnimation();
        resetScrollState();
    }

    function toggle() {
        if (isEnabled.value) {
            disable();
        } else {
            enable();
        }
    }

    onMounted(() => {
        setupMediaQuery();

        nextTick(() => {
            if (containerRef.value) {
                setupListeners();
            }
        });
    });

    onUnmounted(() => {
        removeListeners();
        cleanupMediaQuery();
        stopAnimation();
    });

    return {
        containerRef,
        scrollProgress,
        isScrolling,
        isDesktop,
        isEnabled,
        isActive,
        scrollTo,
        scrollBy,
        enable,
        disable,
        toggle,
        setupListeners,
        removeListeners,
    };
}
