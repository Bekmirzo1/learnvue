<template>
  <div class="ui__block">
    <h2 class="ui__title">Transition</h2>
    <my-button class="btn_green-bd" @click="showAnim = !showAnim">
      Click
    </my-button>
    <!--
              Transition это встроенный компонент vue использующийся для анимации, в которой элементы исчезают и появляются со страницы (удаление с dom или исчезновение элемента c помощью директивы v-show).
              Transition используется для одного элемента/для встроенного компонента с одним слотом/для компонента с одним корневым элементом.
            -->

    <Transition>
      <p v-show="!showAnim">hello</p>
    </Transition>
    <!-- Мы можем переключатся между двумя элементами, используя v-if / v-else / v-else-if, но зная,-->
    <!-- Атрибут name со значением slide-up говорит, что вместо v-, классы анимации будут начинаться с slide-up -->
    <!-- Атрибут mode со значением out-in делает так, чтобы после окончания анимации одного элемента, анимировался другой -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="docState === 'saved'">
        <my-button @click="docState = 'edited'"> Edit </my-button>
      </div>
      <div v-else-if="docState === 'edited'">
        <my-button @click="docState = 'editing'"> Save </my-button>
      </div>
      <div v-else-if="docState === 'editing'">
        <my-button @click="docState = 'saved'"> Cancel </my-button>
      </div>
    </Transition>
    <my-button class="btn_green-bd" @click="showAnimElem = !showAnimElem">
      Click
    </my-button>
    <Transition
      :css="false"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div v-show="!showAnimElem" class="anim-hooks-elem">
        Animation javascript hooks hooks
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// For Animation
const showAnim = ref('')

const docState = ref('saved')

const showAnimElem = ref('')

// js hooks
const duration = 500
let elemHeight

function onLeave(el, done) {
  console.log(elemHeight)
  animate({
    duration: duration,
    timing(timing) {
      return timing
    },
    draw: function (progress) {
      el.style.height = `${elemHeight - progress * elemHeight}px`
    },
    callback() {
      done()
    },
  })
  /* requestAnimationFrame(frame);
  function frame() {
    if (pos > 150) {
      done();
    } else {
      pos++;
      el.style.left = pos + "px";
      requestAnimationFrame(frame);
    }
  } */
}
function onBeforeLeave(el) {
  // el.style.backgroundColor = "yellow";
  if (!elemHeight) elemHeight = el.offsetHeight
  el.style.overflow = 'hidden'
  el.style.height = el.offsetHeight
}
function onEnter(el, done) {
  animate({
    duration: duration,
    timing(timing) {
      return timing
    },
    draw: function (progress) {
      el.style.height = `${progress * elemHeight}px`
    },
    callback() {
      done()
    },
  })
  /* let pos = 150;
  requestAnimationFrame(frame);
  function frame() {
    if (pos < 0) {
      done();
    } else {
      pos--;
      el.style.left = pos + "px";
      requestAnimationFrame(frame);
    }
  } */
}

function animate({ duration, draw, timing, callback }) {
  let start = performance.now()
  requestAnimationFrame(function animateItem(time) {
    // time - start = пройденное время с начала анимации
    // duration = продолжительность анимации
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    draw(timing(timeFraction))
    if (timeFraction < 1) {
      requestAnimationFrame(animateItem)
    } else {
      if (callback) callback()
    }
  })
}
</script>
<style lang="scss">
// Animation
// В css анмации встроенного компонента Transition есть 6 классов указываюших на цикл анимации
// Классы с leave - Относятся к переходу из исходного состояния к новому
// Классы с enter - Относятся к переходу из нового состояния к исходному

// v-leave-from - Starting state for leave. Вставляется в начале перехода
// v-leave-active - Active state for leave. Вставляется в течении всей анимации
// v-leave-to - Ending state for leave. Вставляется после удаления v-leave-from, удаляется после завершения анимации
// v-enter-from - Starting state for enter. Вставляется в начале перехода
// v-enter-active - Active state for enter. Вставляется в течении всей анимации
// v-enter-to - Ending state for enter. Вставляется после удаления v-enter-from, удаляется после завершения анимации
.v-leave-active,
.v-enter-active {
  transition: all 0.5s ease;
}

.v-leave-to,
.v-enter-from {
  opacity: 0;
  transform: translate(toRem(20), 0);
}

// slide-up - имя вставленное в компонент transition
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

// dynam
.dynam-leave-to,
.dynam-enter-from {
  // opacity: 0;
  // transform: translate(toRem(-20), 0);
  height: 0;
  overflow: hidden;
  display: inline-block;
}

// .dynam-leave-from {
//   height: 100%;
// }

.dynam-leave-active {
  transition: all 0.3s ease 0s;
}

.dynam-enter-active {
  transition: all 0.5s ease 0s;
}

.anim-hooks-elem {
  position: relative;
  // display: inline-block;
  background-color: lightgreen;
}
</style>
