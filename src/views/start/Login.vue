<template>
  <div class="content">
    <login-from @loginSubmit="console"></login-from>
  </div>
</template>

<script>
import LoginFrom from '../../components/start/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginFrom,
  },
  methods: {
    console(data) {
      console.log(data)
    }
  },
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