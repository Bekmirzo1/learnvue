<template>
  Пользователь {{ route.params.id }}
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style lang="scss"></style>
