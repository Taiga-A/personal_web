<template>
  <div class="content">
    <login-from @loginSubmit="console"></login-from>
    <div class="goToSignUp">
      <el-link type="primary" @click="goToSignUp()"
        >没有账号？点击注册！</el-link
      >
    </div>
  </div>
</template>

<script>
import LoginFrom from "../../components/start/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginFrom,
  },
  methods: {
    console(data) {
      console.log(data);
    },
    goToSignUp() {
      this.$router.replace("/signup");
    },
  },
};
</script>

<style>
.content {
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.goToSignUp {
  margin-top: 20px;
}
</style>