<template>
  <header class="header">
    <div class="header__container">
      <div class="header__body">
        <div class="header__logo">
          <router-link to="/" class="logo">{{ msg || "VueLearn" }}</router-link>
        </div>
        <ul class="header__list">
          <li>
            <router-link to="/hello" >Hello world</router-link>
          </li>
          <li>
            <a href="" @click="$router.push('/vuefor')"> vfor </a>
          </li>
          <li>
            <router-link to="/vueforcomp" >vfor composition</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  // Здесь несколько вариантов объявления пропсов
  // https://vuejs.org/guide/components/props.html#prop-validation
  props: {
    // Первый вариант
    // msg: String,
    // Второй вариант
    msg: {
      type: String,
      required: true, // true значение по умолчанию
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.header {
  // .header__container
  &__container {
  }
  // .header__body
  &__body {
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
  }
  // .header__logo
  &__logo {
  }
  // .header__list
  &__list {
    display: flex;
    align-items: center;
    gap: toRem(16);
    a {
      padding: 10px 16px;
      border: 1px solid lightgreen;
      font-size: 18px;
      line-height: 120%;
      white-space: nowrap;
    }
  }
}
</style>
