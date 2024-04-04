<template>
    <div class="modal">
      <p>Вы действительно хотите удалить эту запись о сотруднике?</p>
      <button @click="confirm">Да</button>
      <button @click="cancel">Нет</button>
    </div>
  </template>

<script>
export default {
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style>
.modal{
  font-size: 30px;
  position: fixed;
  top: 25%;
  right: 35%;
  width: 300px;
  padding: 20px;
  background-color: #252525;
  color: white;
  z-index: 1000;
}
</style>