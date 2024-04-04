<template>
    <div v-if="isFormVisible">
    <form @submit.prevent="submitForm">
      <input v-model="localEmployee.employee_name" type="text" placeholder="ФИО">
      <input v-model="localEmployee.employee_salary" type="number" placeholder="Зарплата">
      <input v-model="localEmployee.employee_age" type="number" placeholder="Возраст">
      <button type="submit">Ввод</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    employee: {
      type: Object,
      default: () => ({ employee_name: '', employee_salary: null, employee_age: null })
    }
  },
  data() {
    return {
      localEmployee: { ...this.employee }, // Создаем локальную копию
      isFormVisible: true
    };
  },
  methods: {
    submitForm() {
      if (this.validateEmployeeData()) { // выполняется либо PUT либо POST запрос, в зависимости от наличия id в массиве
        const apiUrl = this.localEmployee.id
        ? `https://dummy.restapiexample.com/api/v1/update/${this.localEmployee.id}`
        : 'https://dummy.restapiexample.com/api/v1/create';

        const method = this.localEmployee.id ? 'put' : 'post';

        if (method == 'put'){ // если мы редактируем существующую запись, то запрашиваем данные по id GET запросом
            axios.get(`https://dummy.restapiexample.com/api/v1/employees/${this.localEmployee.id}`)
              .then(response => {
                this.localEmployee = response.data.data; // предполагается получение всего объекта по id
              })
              .catch(error => {
                console.error("Не удалось получить запись от сервера:", error);
              }); 
        }

        axios[method](apiUrl, this.localEmployee) // либо PUT, либо POST
        .then(response => {
          this.$emit('employee-added', response.data); // предполагается получение всего объекта измененного/добавленного сотрудника
          this.resetForm();
        })
        .catch(error => {
          console.error("Ошибка при создании/обновлении записи:", error);
        });
        this.$emit('close-form');
      } else {
       alert('Пожалуйста, заполните все поля корректно.');
      }
    },
    validateEmployeeData() {
      return this.localEmployee.employee_name.trim() !== '' &&
             this.localEmployee.employee_salary > 0 &&
             this.localEmployee.employee_age > 0;
    },
    resetForm() {
      this.localEmployee.employee_name = '';
      this.localEmployee.employee_salary = null;
      this.localEmployee.employee_age = null;
    }
  }
}
</script>

