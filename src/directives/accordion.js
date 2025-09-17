export default {
    mounted(el) {
        const items = Array.from(el.children);
        let activeIndex = 0;

        if (items.length > 0) {
            items[0].classList.add('active');
        }

        items.forEach((item, index) => {
            const activate = () => {
                items.forEach((el) => el.classList.remove('active'));
                item.classList.add('active');
                activeIndex = index;
            };

            item.addEventListener('mouseenter', activate);
            item.addEventListener('click', activate);
        });
    },
};
