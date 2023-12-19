import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router.js'
import directives from '@/diractives/'
import ui from '@/UI/'
import { createPinia } from 'pinia'

// С помощью createApp мы создаем экземпляр приложения vue
// Синтаксис:
// createApp(rootComponent: Component, rootProps?: object)
// rootComponent - это компонент
// rootProps - это необязательный аргумент, который относится к свойствам, которые нужно передать компоненту
const app = createApp(App)

// С помощью createPinia мы создаем экземпляр приложения pinia
const pinia = createPinia()

// Вот так загружаются глобальные директивы
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})
// Вот так загружаются глобальные компоненты
ui.forEach((ui) => {
  app.component(ui.name, ui)
})

// Метод use утанавливает плагин

// Метод mount привязывает приложение vue к контейнеру
// Метод mount стоит вызывать, после того, как будут вызваны все настройки для приложения
app.use(router).use(pinia).mount('#app')
