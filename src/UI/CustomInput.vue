<template>
  <!-- update:modelValue собыие по умолчанию у v-model, когда он используется в компоненте -->
  <input
    autocomplete="off"
    type="text"
    class="input"
    :value="modelValue"
    :class="{
      _formfocus: focusEvent,
    }"
    @focus="focusEvent = true"
    @blur="focusEvent = false"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script setup>
import { ref } from "vue";
const focusEvent = ref(false);
defineOptions({
  name: "my-input",
});
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<style lang="scss">
.input {
  border-radius: 0 !important;
  width: 100%;
  height: 100%;
  display: block;
  padding: 12px 16px;
  background-color: transparent;
  border: 2px solid #000;
  &._formfocus {
    border-color: green;
  }
  &._form-error {
  }
}
</style>
