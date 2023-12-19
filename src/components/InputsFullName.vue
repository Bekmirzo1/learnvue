<template>
  <input
    autocomplete="off"
    type="text"
    class="input"
    :value="modelValue"
    placeholder="First name"
    @input="emitValue($event, props.modelModifiers, 'update:modelValue')" />

  <input
    autocomplete="off"
    type="text"
    class="input"
    :value="secondName"
    placeholder="second name"
    @input="emitValue($event, props.secondNameModifiers, 'update:secondName')" />
</template>
<script setup>
const props = defineProps({
  modelValue: String,
  secondName: String,
  // modelModifiers - это пропс по умолчанию, для modelValue, с помощью него в v-model используются кастомные модификаторы
  // Назову это - Моделью модификатора
  modelModifiers: { default: () => ({}) },
  // Если пропс не modelValue, то название нового модификатора, для этого пропса, состоит из названия пропса + Modifiers
  // Если хотим привязать модель модификатора не к modelValue, то его название должно состоять из названия пропса(к которуму будет относится модель) + Modifiers
  secondNameModifiers: { default: () => ({}) },
});
const emit = defineEmits(["update:modelValue", "update:secondName"]);
function emitValue(e, modelModifiers, event) {
  let value = e.target.value;
  if (modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit(event, value);
}
</script>
<style lang="scss">
.input {
  border-radius: 0 !important;
  width: 100%;
  height: 100%;
  display: block;
  padding: 12px 16px;
  background-color: transparent;
  border: 1px solid #000;
  &:focus {
    border-color: green;
  }
  &._form-focus {
  }
  &._form-error {
  }
}
</style>
