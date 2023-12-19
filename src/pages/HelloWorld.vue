<template>
  <!-- Атрибуты начинающиеся с v-, относятся к vue директивам которые стоят по умолчанию -->
  <div class="home">
    <div class="home__container">
      <div class="ui">
        <div class="ui__blocks">
          <!-- Block Basics -->
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
              :disabled="count <= 0" />

            <!-- С помощью v-html можно вставлять данные как html -->
            <p>Using text interpolation: {{ rawHtml }}</p>
            <p>
              Using v-html directive:
              <span v-html="rawHtml"></span>
            </p>

            <!-- v-on - прикрепляет прослушивание событий к элементу -->
            <button class="btn" type="button" v-on:click="count++">
              Click +
            </button>
            <!-- Знак "@" перед атрибутом - это пороткая версия v-on -->
            <!-- В синтаксисе v-on могут быть модификаторы. Один из них это .prevent - он вызывает event.preventDefault() -->
            <button
              class="btn"
              type="button"
              :disabled="countMy"
              @click.prevent="numberLess">
              Click -
            </button>
          </div>
          <!-- Block v-model -->
          <div class="ui__block">
            <h2 class="ui__title">v-model</h2>
            <!-- Вот как происходит двухсторонняя привязка данных в формах -->
            <input
              :value="inpValue"
              @input="(e) => (inpValue = e.target.value)"
              placeholder="Without v-model"
              class="input" />
            <pre>{{ inpValue }}</pre>
            <!-- v-model - упрощает этот процесс, у него есть ещё дополнительные возможности -->
            <!-- Например, к нему можно приписать модификатор trim (То ж самое что и str.trim()) -->
            <input
              v-model.trim="inpValueBetter"
              placeholder="v-model"
              class="input" />
            <div></div>
            <pre>{{ inpValueBetter }}</pre>
            <br />
            <input
              type="checkbox"
              id="jack"
              value="Jack"
              v-model="checkedNames" />
            <label for="jack">Jack</label>
            <input
              type="checkbox"
              id="john"
              value="John"
              v-model="checkedNames" />
            <label for="john">John</label>
            <div>
              Checked names:
              <pre>{{ checkedNames }}</pre>
            </div>
          </div>
          <!-- Block refs -->
          <div class="ui__block">
            <h2 class="ui__title">ref</h2>
            <!-- Атрибут ref создаёт своеобразную ссылку на элемент, которая вставляется в объект this.$refs -->
            <p ref="pElementRef" class="sentence">
              refElem className: {{ refClass }}
            </p>
          </div>
          <!-- Block wathcers -->
          <div class="ui__block">
            <h2 class="ui__title">Watchers</h2>
            <p>Todo id: {{ todoId }}</p>
            <button class="btn" @click="todoId = todoId + 2">Fetch next todo</button>
            <p v-if="!todoData">Loading...</p>
            <pre v-else>{{ todoData }}</pre>
          </div>
          <!-- Block emit -->
          <div class="ui__block">
            <h2 class="ui__title">Emits</h2>
            <!-- Слушаем событие из дочернего компонента -->
            <child-component @init-child-val="(val) => (childData = val)">
            </child-component>
            <div>
              ChildValue:
              <pre>{{ childData }}</pre>
            </div>
          </div>
          <!-- Slots, global components, v-model with components -->
          <div class="ui__block">
            <h2 class="ui__title">Slots, global components</h2>
            <my-button type="button" class="btn_green-bd" :icon="true">
              button component
              <!-- #another - короткая версия v-slot:another-->
              <template #another>
                <span
                  style="
                    color: #455a64;
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 25px;
                  ">
                  v
                </span>
              </template>
            </my-button>
            <h2 class="ui__title2">v-model with components</h2>
            <!-- Когда v-model используется в компоненте, то автоматически, по умолчанию, происходит привязка к пропсу modelValue -->
            <my-input v-model="inpValueComponent" />
            <div>
              <pre>{{ inpValueComponent }}</pre>
            </div>
            <!-- Можно вставлять несколько v-model в компонент. Привязанный пропс по умолчанию 'modelValue', можно менять. К примеру вот так происходит привязка пропса title - v-model:title -->
            <!-- capitalize - это кастомный модификатор -->
            <inputs-full-name
              v-model.capitalize="inpFirstName"
              v-model:secondName.capitalize="inpSecondName" />
            <div>
              <pre>{{ inpFirstName }}</pre>
              <pre>{{ inpSecondName }}</pre>
            </div>
          </div>
          <div class="ui__block">
            <h2 class="ui__title">Form validation</h2>
            <FormWithValid></FormWithValid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildComponent from "@/components/ChildComponent.vue";
import InputsFullName from "@/components/InputsFullName.vue";
import FormWithValid from "@/components/FormWithValid.vue";
export default {
  components: {
    ChildComponent,
    InputsFullName,
    FormWithValid,
  },
  // data - Функция, которая возвращает начальное реактивное состояние для экземпляра компонента
  data() {
    return {
      rawHtml: "<strong>hello</strong>",
      count: 0,
      // Свойсвтва в data становяться реактивнми за счет proxy
      someObject: {},
      inpValue: "",
      inpValueBetter: "",
      checkedNames: ["Jack"],
      refClass: "",
      // watchers
      todoId: 1,
      todoData: null,
      // data from child
      childData: "",
      inpValueComponent: "",
      inpFirstName: "",
      inpSecondName: "",
    };
  },
  // В поле methods создаются функции, которые будут использоваться в экземпляре компонента
  methods: {
    numberLess() {
      this.count--;
    },
    onInput(e) {
      this.inpValue = e.target.value;
    },
    // Для watchers
    async fetchData() {
      this.todoData = null;
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${this.todoId}`
      );
      this.todoData = await res.json();
    },
  },
  // mounted относится к хукам жизненнего цикла
  mounted() {
    /* // Примеры с computed
    console.log(this.someObject) // Proxy

    console.log(this.nowTime) // Дата
    setTimeout(() => {
      console.log(this.nowTime) // Та же дата
      console.log(Date.now()) // Обновленная дата
    }, 900) */
    //====================================================================================================
    // К this.$refs мы получаем доступ, после того как срабатывает хук mounted
    this.refClass = this.$refs.pElementRef.className;
    //====================================================================================================
    // Для watchers
    this.fetchData();
  },
  // Вычесляемые свойства вставляются в computed, свойства в computed являются кэшируемыми (предыдущие значения сохраняются)
  // Свойства computed изменяются только тогда, когда меняется реактивное состояние внутри него
  computed: {
    // При изменении this.count, изменяется вычесляемое свойство countMy
    countMy() {
      return this.count <= 0;
    },
    // Свойство nowTime не измениться, после первого объявления потому что Date.now() не зависимо реактивно
    nowTime: () => Date.now(),
  },
  // Внутри watch мы можем вызывать функцию, при изменении реактивного свойства
  watch: {
    todoId(newVal, oldVal) {
      console.log("Old fetch data id - " + oldVal);
      console.log("New fetch data id - " + newVal);
      this.fetchData();
    },
  },
};
</script>

<!-- Аттрибут scoped в style - означает, что стили будут применяться только к текущему компоненту, извне эти стили не достпны -->
<style lang="scss" scoped>
.home {
  background-color: whitesmoke;
}
</style>
