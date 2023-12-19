<template>
  <form @submit.prevent="addTodo">
    <input v-model.trim="newTodo" class="input" />
    <button class="btn">Add Todo</button>
  </form>
  <ul class="todos">
    <!-- Для перечисления списков можно использовать директиву v-for -->
    <!-- Синтаксис alias in expression -->
    <!-- Vue рекомендует всегда привязывать какое-то уникальное значение (например id каждого 'alias') к атрибуту key в v-for, за исключением тех случаев, когда вообще не планируется редактирование порядка элементов -->
    <li v-for="todo in filteredTodos" :key="todo.id" class="todos__todo todo">
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
</template>
<script>
// script
export default {
  data() {
    return {
      newTodo: "",
      hideCompleted: false,
      todos: [
        { id: 0, text: "Learn HTML", done: true },
        { id: 1, text: "Learn JavaScript", done: true },
        { id: 2, text: "Learn Vue", done: false },
      ],
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo !== "") {
        this.todos.push({
          id: this.todos.length,
          text: this.newTodo,
          done: false,
        });
        this.newTodo = "";
      }
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((item) => item.id !== todo.id);
    },
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((item) => !item.done)
        : this.todos;
    },
  },
};
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
