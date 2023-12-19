import { ref } from 'vue';
import { useEventListener } from '@/hooks/event.js';

// by convention, composable function names start with "use"
export function useMouse() {
    // state encapsulated and managed by the composable
    const mousex = ref(0)
    const mousey = ref(0)

    // a composable can update its managed state over time.
    function update(event) {
        mousex.value = event.pageX
        mousey.value = event.pageY
    }

    useEventListener(window, 'mousemove', update);

    return { mousex, mousey }
}