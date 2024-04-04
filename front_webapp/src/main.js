import { createApp } from 'vue'
import App from './App.vue'
import EmployeeManager from '@/components/EmployeeManager.vue';

// Создаем экземпляр приложения Vue с помощью функции createApp
const app = createApp(App);

// Регистрируем компонент EmployeeManager как глобальный компонент
app.component('EmployeeManager', EmployeeManager);

// Отключаем подсказку о продакшн версии
app.config.productionTip = false;

// Монтируем приложение
app.mount('#app');