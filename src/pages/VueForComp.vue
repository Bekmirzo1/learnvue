<template>
  <div class="ui">
    <div class="ui__container">
      <div class="ui__blocks">
        <div class="ui__block">
          <h1 class="ui__title">v-for with composition api</h1>
          <form @submit.prevent="addTodo">
            <input v-model.trim="newTodo" class="input" />
            <button class="btn">Add Todo</button>
          </form>
          <ul class="todos">
            <!-- Для перечисления списков можно использовать директиву v-for -->
            <!-- Синтаксис alias in expression -->
            <!-- Vue рекомендует всегда привязывать какое-то уникальное значение (например id каждого 'alias') к атрибуту key в v-for, за исключением тех случаев, когда вообще не планируется редактирование порядка элементов -->
            <li
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="todos__todo todo">
              <input type="checkbox" class="todo" v-model="todo.done" />
              <span class="todo__text" :class="{ done: todo.done }">{{
                todo.text
              }}</span>
              <button @click="removeTodo(todo)">X</button>
            </li>
          </ul>
          <button @click="hideCompleted = !hideCompleted">
            {{ hideCompleted ? "Show all" : "Hide completed" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// При использовании сomposition api рекомендуют вставлять setup в скрипт для лучшей работы
// Можно прочитать здесь зачем вставляется setup https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from "vue";

const newTodo = ref("");
const hideCompleted = ref(false);
const todos = ref([
  { id: 0, text: "Learn HTML", done: true },
  { id: 1, text: "Learn JavaScript", done: true },
  { id: 2, text: "Learn Vue", done: false },
]);

function addTodo() {
  if (newTodo.value !== "") {
    todos.value.push({ id: todos.value.length, text: newTodo.value, done: false });
    newTodo.value = "";
  }
}
function removeTodo(todo) {
  todos.value = todos.value.filter((item) => item.id !== todo.id);
}
const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((item) => !item.done)
    : todos.value;
});
// script
// export default {
//   data() {
//     return {
//       newTodo: "",
//       hideCompleted: false,
//       todos: [
//         { id: 0, text: "Learn HTML", done: true },
//         { id: 1, text: "Learn JavaScript", done: true },
//         { id: 2, text: "Learn Vue", done: false },
//       ],
//     };
//   },
//   methods: {
//     addTodo() {
//       if (this.newTodo !== "") {
//         this.todos.push({
//           id: this.todos.length,
//           text: this.newTodo,
//           done: false,
//         });
//         this.newTodo = "";
//       }
//     },
//     removeTodo(todo) {
//       this.todos = this.todos.filter((item) => item.id !== todo.id);
//     },
//   },
//   computed: {
//     filteredTodos() {
//       return this.hideCompleted
//         ? this.todos.filter((item) => !item.done)
//         : this.todos;
//     },
//   },
// };
</script>
<style lang="scss">
.todos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: toRem(20);
  margin: 20px 0px 0px 0px;
  // .todos__todo
  &__todo {
  }
}

.todo {
  display: inline-flex;
  align-items: center;
  // .todo__text
  &__text {
    margin: 0px 5px 0px 10px;
    &.done {
      text-decoration: line-through;
    }
  }
}
</style>
