<template>
  <!--
    Встроенный компонент 'component' вместе с привязкой атрибута is, 
    используются для создания динамических компонентов или элементов 
  -->
  <component :is="element" :href="href" class="btn">
    <!-- Слоты нужны для того чтобы на их месте что-либо вставлять -->
    <slot></slot>
    <span v-if="icon" class="btn__icon">
      <slot name="another">
        <img src="@/assets/images/vue.svg" alt="" />
      </slot>
    </span>
  </component>
</template>
<script>
export default {
  // Название компонента
  name: "my-button",

  props: {
    icon: Boolean,
    href: String,
  },
  data() {
    return {};
  },
  computed: {
    element() {
      return this.href == "" || this.href ? "a" : "button";
    },
  },
};
</script>
<style lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  &_green-bd {
    border: 1px solid lightgreen;
  }
  &__icon {
    width: 25px;
    margin: 0px 0px 0px 10px;
    img {
      max-width: 100%;
    }
  }
}
</style>
