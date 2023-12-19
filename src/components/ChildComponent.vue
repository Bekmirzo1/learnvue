<template></template>
<script>
export default {
  // Для получения родительским компонентом значение дочернего компонента, используются кастомные события в emits
  emits: ["initChildVal"],
  // Можно и так эмитить
  // emits: 'initChildVal',
  data() {
    return {
      emitMessage: "Message from Child came",
    };
  },
  mounted() {
    this.$emit("initChildVal", this.emitMessage);
  },
};
</script>
<style lang="scss"></style>
