import { ref, onMounted } from "vue";



export const VIntersection = {
    // https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
    mounted: (el, binding) => {
        const options = {
            rootMargin: el.dataset.root ? el.dataset.root : "0px",
            threshold: 0,
        };
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                binding.value(true);
            } else {
                binding.value(false);
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
};
