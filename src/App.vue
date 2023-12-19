<template>
  <!-- Компонент можно записывать как есть, или через дефис там где были большие буквы -->
  <!-- Дочерний компонент может принимать значения с родительского компонента с помощью props -->
  <!-- Это динамически вставленное значение props -->
  <header-main :msg="headerMessage"></header-main>
  <!-- Это статически вставленное значение props -->
  <!-- <header-main msg="Vue" ></header-main> -->
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script>
// Каждый файл .vue является компонентом (SFC - Single-File Component)
// SFC - это блок кода, который инкапсулирует внутри себя html, css, js, которые связаны друг с другом, внутри файла .vue

// Для использования компонента, мы импортируем его
import HeaderMain from "@/modules/Header.vue";

export default {
  // После импорта компонента, нам нужно его зарегистрировать используя свойство 'components'
  components: {
    HeaderMain,
  },
  data() {
    return {
      headerMessage: "Vue",
    };
  },
};
</script>
<style lang="scss">
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.app {
  padding: 40px 0px 200px;
}

</style>
