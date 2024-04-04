<template>
    <div>
      <button class="add-btn" @click="showAddEmployeeForm">Добавить</button>
      <employee-table
        :employees="employees"
        @edit-employee="handleEditEmployee"
        @delete-employee="DeleteEmployee"
      />
      <div class="add-form">
        <employee-form
          v-if="isFormVisible"
          :employee="selectedEmployee"
          @employee-added="handleEmployeeAdded"
          @close-form="hideForm"
        />
      </div>
      <div class="del-dia">
        <confirm-dialog
          v-if="showConfirmDialog"
          @confirm="ConfirmDelete"
          @cancel="CancelDelete"
        />
      </div>
    </div>
  </template>

<script>
import axios from 'axios'
import EmployeeTable from './EmployeeTable.vue';
import EmployeeForm from './EmployeeForm.vue';
import ConfirmDialog from './ConfirmDialog.vue';

export default {
  components: {
    EmployeeTable,
    EmployeeForm,
    ConfirmDialog
  },
  data() {
    return {
      employees: [], // Массив сотрудников
      selectedEmployee: null, // Выбранный для редактирования сотрудник
      showConfirmDialog: false, // Показывать ли диалог подтверждения
      isFormVisible: false,
      idToDelete: null, // Сотрудник, выбранный для удаления
    };
  },
  methods: {
    showForm() {
      this.isFormVisible = true; // Показываем форму
    },
    hideForm() {
      this.isFormVisible = false; // Скрываем форму
    },
    showAddEmployeeForm() {
      this.showForm(); // Показываем форму
      this.selectedEmployee = { employee_name: '', employee_salary: null, employee_age: null }; // Пустой объект для нового сотрудника
    },
    handleEmployeeAdded(employee) { // предполагаем что после запроса вернулся полный объект сотрудника
        if (employee.id) { // если редактировался
          const index = this.employees.findIndex(e => e.id === employee.id);
            if (index !== -1) {
              this.employees.splice(index, 1, employee);
            }
        } else { // если добавлялся новый сотрудник
          this.employees.push(employee);
        }
      this.isFormVisible = false;
    },
    handleEditEmployee(employee) {
      this.showForm();
      this.selectedEmployee = Object.assign({}, employee); // Клонируем объект сотрудника для редактирования
    },
    DeleteEmployee(id) {
      this.idToDelete = id;
      this.showConfirmDialog = true;
    },
    handleEmployeeSubmit(employee) {
      // Отправляем POST-запрос на сервер для создания нового сотрудника
      axios.post('https://dummy.restapiexample.com/api/v1/create', employee)
      .then(response => {
        // Добавляем нового сотрудника в массив employees
        this.employees.push(response.data.data);
        // Скрываем форму после успешного добавления
        this.isFormVisible = false;
      })
      .catch(error => {
        console.error("Ошибка при создании записи:", error);
      });
    },
    ConfirmDelete() { // отправляем DELET запрос
      axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${this.idToDelete}`)
        .then(() => {
          // Удаление сотрудника из массива после подтверждения от сервера
          this.employees = this.employees.filter(employee => employee.id !== this.idToDelete);
          this.showConfirmDialog = false;
        })
        .catch(error => {
          console.error("Ошибка при удалении сотрудника:", error);
          this.showConfirmDialog = false;
        })
    },
    CancelDelete() {
      this.showConfirmDialog = false;
    }
  }
}
</script>

<style>
.add-btn {
  padding: 10px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  cursor: pointer;
  background-color: #62ad64;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.add-btn:hover {
  background-color: #45a049;
}
.add-form{
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  padding: 20px;
  z-index: 1000;
}
</style>