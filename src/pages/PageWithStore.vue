<template>
  CountValue: <span>{{ store.count }}</span>
</template>
<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/store/example.js";

const store = useCounterStore();
</script>
<style lang="scss"></style>
