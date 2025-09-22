export default {
    mounted(el, binding) {
        const options = binding.value || {};
        const { hover = false, defaultIndex = null } = options;

        const items = Array.from(el.children);

        if (defaultIndex !== null && Number.isInteger(defaultIndex) && items[defaultIndex]) {
            items[defaultIndex].classList.add('active');
        }

        const activate = (index) => {
            items.forEach((el) => el.classList.remove('active'));
            items[index].classList.add('active');
        };

        items.forEach((item, index) => {
            if (hover) {
                item.addEventListener('mouseenter', () => activate(index));
            }
            item.addEventListener('click', () => activate(index));
        });
    },
};
