<template>
  <div class="home">
    <div class="home__container">
      <div class="ui">
        <div class="ui__blocks">
          <!-- Basic -->
          <BasicMain></BasicMain>
          <!-- Block v-model -->
          <div class="ui__block">
            <h2 class="ui__title">v-model</h2>
            <!-- Вот как происходит двухсторонняя привязка данных в формах -->
            <input
              :value="inpValue"
              placeholder="Without v-model"
              class="input"
              @input="(e) => (inpValue = e.target.value)"
            />
            <pre>{{ inpValue }}</pre>
            <!-- v-model - упрощает этот процесс, у него есть ещё дополнительные возможности -->
            <!-- Например, к нему можно приписать модификатор trim (То ж самое что и str.trim()) -->
            <input
              v-model.trim="inpValueBetter"
              placeholder="v-model"
              class="input"
            />
            <div></div>
            <pre>{{ inpValueBetter }}</pre>
            <br />
            <input
              v-model="checkedNames"
              id="jack"
              type="checkbox"
              value="Jack"
            />
            <label for="jack">Jack</label>
            <input
              v-model="checkedNames"
              id="john"
              type="checkbox"
              value="John"
            />
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
            <button type="button" class="btn" @click="todoId++">
              Fetch next todo
            </button>
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
                  "
                >
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
              v-model:secondName.capitalize="inpSecondName"
            />
            <div>
              <pre>{{ inpFirstName }}</pre>
              <pre>{{ inpSecondName }}</pre>
            </div>
          </div>
          <!-- Form validaiton -->
          <div class="ui__block">
            <h2 class="ui__title">Form validation</h2>
            <FormWithValid></FormWithValid>
          </div>
          <!-- Composable -->
          <div class="ui__block">
            <h2 class="ui__title">Composable</h2>
            Mouse position is at: pageX = {{ mouse.mousex }}, pageY =
            {{ mouse.mousey }}
          </div>
          <!-- Diractive -->
          <div class="ui__block">
            <h2 class="ui__title">Directives</h2>
            <my-input v-intersection="changeObserve" />
            <div
              v-if="observed"
              style="
                color: lightgreen;
                position: fixed;
                top: 0;
                font-size: 18px;
              "
            >
              input with directives observed
            </div>
          </div>
          <!-- Store -->
          <div class="ui__block">
            <h2 class="ui__title">Store (Pinia)</h2>
            <div>{{ store.count }}</div>
            <my-button class="btn_green-bd" @click="store.increment">
              Count++
            </my-button>
            Same value should be
            <router-link to="/pagestore" class="link">here</router-link>
          </div>
          <!-- Transition -->
          <TransitionMain></TransitionMain>
          <!-- Vue router -->
          <div class="ui__block">
            <h2 class="ui__title">Vue router</h2>
            <ul class="user-list">
              <li>
                <router-link :to="'/users/' + users[0].id">
                  Пользователь Андрей
                </router-link>
              </li>
              <li>
                <router-link :to="String(users[0].id)">
                  Тот же Андрей
                </router-link>
              </li>
              <li>
                <a href="" @click.prevent="router.push(String(users[1].id))"
                  >Пользователь Саша</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue"
import ChildComponent from "@/components/ChildComponent.vue"
import InputsFullName from "@/components/InputsFullName.vue"
import FormWithValid from "@/components/FormWithValid.vue"
import { useRouter } from "vue-router"

import BasicMain from "@/pages/MainPage/BasicMain.vue"
import TransitionMain from "@/pages/MainPage/transitionMain.vue"
// import "@/hooks/dont.js";
//====================================================================================================
// Vue router
const router = useRouter()

let users = ref([
  {
    id: 1,
  },
  {
    id: 2,
  },
])
//====================================================================================================

// hooks
import { useMouse } from "@/hooks/mouse.js"
// const rawHtml = ref('<strong>hello</strong>')
// const count = ref(0)
const inpValue = ref("")
const inpValueBetter = ref("")
const checkedNames = ref(["Jack"])
const refClass = ref("")
// watchers
const todoId = ref(1)
const todoData = ref(null)
// data from child
const childData = ref("")
const inpValueComponent = ref("")
const inpFirstName = ref("")
const inpSecondName = ref("")
//====================================================================================================
// Composable
// mouse tracking
// const { mousex, mousey } = useMouse()
const mouse = useMouse()
//====================================================================================================
// Custom diractives
// v-intersection diractive
// import { VIntersection } from "@/diractives/VIntersection.js";
const observed = ref(false)

function changeObserve(value) {
  if (value) {
    observed.value = true
  } else {
    observed.value = false
  }
}

//====================================================================================================
// Store (Pinia)
import { useCounterStore } from "@/store/example.js"

const store = useCounterStore()

//====================================================================================================
/* function numberLess() {
  return count.value--
} */
// Для watchers
async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`,
  )
  todoData.value = await res.json()
}
//====================================================================================================
// Для доступа к самим элементам шаблона, создаем переменную, которая называется как значение в атрибуте refs, значение этой переменной должно быть ref(null)
const pElementRef = ref(null)
// onMounted относится к хукам жизненнего цикла
onMounted(() => {
  // Мы можем проводить какие-либо операции с элементами шаблона, только после назначения хука onMounted
  refClass.value = pElementRef.value.className
  // Для watch
  fetchData()
})
//====================================================================================================
/* // Computed
// Вычесляемые свойства вставляются в computed, свойства в computed являются кэшируемыми (предыдущие значения сохраняются)
// Свойства computed изменяются только тогда, когда меняется реактивное состояние внутри него
// Пример с computed
/* const nowTime = computed(() => Date.now());
console.log(nowTime.value + " computed дата"); // Дата
setTimeout(() => {
  console.log(nowTime.value + " computed дата через секунду"); // Та же дата
  console.log(Date.now() + " новая дата через секунду"); // Обновленная дата
}, 1000); */
//====================================================================================================
// watch
watch(todoId, (newVal, oldVal) => {
  console.log("Old fetch data id - " + oldVal)
  console.log("New fetch data id - " + newVal)
  fetchData()
})

//====================================================================================================
</script>

<style lang="scss">
//====================================================================================================

//====================================================================================================

.user-list {
  display: inline-flex;
  gap: toRem(20);

  li {
    a {
      @extend .link;
    }
  }
}

//====================================================================================================
</style>
