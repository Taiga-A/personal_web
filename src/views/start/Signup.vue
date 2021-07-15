<template>
  <div class="content">
    <signup-form />
  </div>
</template>

<script>
import SignupForm from '../../components/start/SignupForm.vue'

export default {
  name: 'Signup',
  components: {
    SignupForm,
  }
}
</script>

<style>
.content {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
}
</style>