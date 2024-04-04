<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Зарплата</th>
            <th>Возраст</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id" @dblclick="editEmployee(employee)">
            <td>{{ employee.id }}</td>
            <td>{{ employee.employee_name }}</td>
            <td>{{ employee.employee_salary }}</td>
            <td>{{ employee.employee_age }}</td>
            <td>
             <button @click="deleteEmployee(employee.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      employees: [] // Здесь будут храниться данные сотрудников
    };
  },
  mounted(){
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      axios.get('https://dummy.restapiexample.com/api/v1/employees')
        .then(response => {
          this.employees = response.data.data;
        })
        .catch(error => {
          console.error("Ошибка при запросе с сервера:", error);
        });
    },
    editEmployee(employee) {
        this.$emit('edit-employee', employee);
    },
    deleteEmployee(id) {
        this.$emit('delete-employee', id);
    }
  }
}
</script>

<style>
   table {
     width: 100%;
     border-collapse: collapse;
   }

   th, td {
     border: 1px solid #ddd;
     padding: 8px;
     text-align: center;
   }

   th {
     background-color: #f4f4f4;
   }

   tr:nth-child(even) {
     background-color: #f9f9f9;
   }

   button {
     margin-right: 5px;
   }
</style>
