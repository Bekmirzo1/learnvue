<template>
  <div class="ui__block">
    <h2 class="ui__title">Basics</h2>
    <!-- Привязка данных в текст может осуществляется с помощью двойных фигурных скобок - это называется текстовой интерполяцией -->
    <p>Count - {{ count }}</p>
    <!-- С помощью v-bind проиходит привязка данных к атрибутам -->
    <input type="number" v-bind:value="count" class="input" disabled />
    <!-- Знак ":" перед атрибутом - это котороткая версия v-bind -->
    <!-- У класса вместе с v-bind есть свой синтаксис -->
    <input
      type="text"
      :value="count + ' покупок'"
      class="input"
      :class="{
        gray: count <= 0,
      }"
      :disabled="count <= 0"
    />
    <!-- С помощью v-html можно вставлять данные как html -->
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>
      Using v-html directive:
      <span v-html="rawHtml"></span>
    </p>

    <!-- v-on - прикрепляет прослушивание событий к элементу -->
    <button class="btn" type="button" v-on:click="count++">Click +</button>
    <!-- Знак "@" перед атрибутом - это пороткая версия v-on -->
    <!-- В синтаксисе v-on могут быть модификаторы. Один из них это .prevent - он вызывает event.preventDefault() -->
    <button
      class="btn"
      type="button"
      :disabled="ShowCounted"
      @click.prevent="numberLess"
    >
      Click -
    </button>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
// ref() принимает аргумент и возвращает его, завернутый в объект ref со свойством .value
const rawHtml = ref('<strong>hello</strong>')
const count = ref(0)

function numberLess() {
  return count.value--
}
// Computed
// Вычесляемые свойства вставляются в computed, свойства в computed являются кэшируемыми (предыдущие значения сохраняются)
// Свойства computed изменяются только тогда, когда меняется реактивное состояние внутри него
const ShowCounted = computed(() => {
  return count.value <= 0
})
</script>
<style lang="scss"></style>
