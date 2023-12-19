<template>
  <form action="" class="from" @submit.prevent="FormSubmit">
    <div class="from__input">
      <!-- <my-input type="text" v-model="inputText" @blur="validateInput" /> -->
      <my-input type="text" v-model="inputText" />
      <div class="from__error" v-if="error">
        {{ error }}
      </div>
    </div>
    <my-button type="submit" class="btn_green-bd"> Submit </my-button>
  </form>
</template>
<script setup>
import { ref, watch } from "vue";
const check = ref(false);
const inputText = ref("");
const error = ref("");
const validateInput = () => {
  error.value = inputText.value === "" ? "The Input field is required" : false;
};
watch(check, (newCheck) => {});

/* const validateInput = () => {
  if (check.value) {
    error.value =
      inputText.value === "" ? "The Input field is required" : false;
  }
}; */

// const dev = ref(true);
const dev = ref(true);
async function FormSubmit(e) {
  if (dev.value) {
    validateInput();
  }
}

</script>
<style lang="scss">
.from {
  // .from__input
  &__input {
  }
  // .from__error
  &__error {
    color: $redColor;
    font-size: 13px;
  }
}
</style>
