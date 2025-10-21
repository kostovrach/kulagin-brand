import { nextTick } from 'vue';

export default {
    mounted(el, binding) {
        let rafId = null;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let active = false;
        const bound = !!binding.value;

        Object.assign(el.style, {
            position: 'absolute',
            // pointerEvents: 'none',
            zIndex: '5',
            opacity: '0',
            transition: 'opacity 0.4s',
        });

        const parent = bound ? el.parentElement : document.body;

        const updatePosition = () => {
            const ease = 0.3;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            el.style.transform = `translate(${currentX}px, ${currentY}px)`;

            rafId = requestAnimationFrame(updatePosition);
        };

        const onMouseMove = (e) => {
            const rect = parent.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            mouseX = x - el.offsetWidth / 1.5;
            mouseY = y - el.offsetHeight / 2;

            if (!active) {
                active = true;
                el.style.opacity = '1';
                updatePosition();
            }
        };

        const onMouseLeave = () => {
            active = false;
            el.style.opacity = '0';
            cancelAnimationFrame(rafId);
        };

        parent.addEventListener('mousemove', onMouseMove);
        parent.addEventListener('mouseleave', onMouseLeave);

        el.__followCursorCleanup__ = () => {
            parent.removeEventListener('mousemove', onMouseMove);
            parent.removeEventListener('mouseleave', onMouseLeave);
            document.body.style.cursor = '';
            cancelAnimationFrame(rafId);
        };
    },

    updated(el, binding) {
        if (!!binding.value !== !!binding.oldValue) {
            el.__followCursorCleanup__?.();
            nextTick(() => {
                this.mounted(el, binding);
            });
        }
    },

    unmounted(el) {
        el.__followCursorCleanup__?.();
    },
};
