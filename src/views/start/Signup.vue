<template>
  <div class="content">
    <signup-form
      @signUpSubmit="setUserData"
      :loading="loading"
      :buttonType="buttonType"
    />
    <div class="goToLogin">
      <el-link class="el-icon-finished" type="primary" @click="goToLogin()"
        >已有账号？去登录！
      </el-link>
    </div>
  </div>
</template>

<script>
import SignupForm from "../../components/start/SignupForm.vue";

import { getAuthCode, sendSignUpData } from "../../network/signUp";

export default {
  name: "Signup",
  data() {
    return {
      submitData: {
        nickName: "",
        email: "",
        phoneNumber: "",
        password: "",
        code: "",
      },
      loading: false,
      buttonType: "primary",
      getTime: 60,
      canGetAuthCode: true,
    };
  },
  components: {
    SignupForm,
  },
  methods: {
    goToLogin() {
      this.$router.replace("/login");
    },
    setUserData(data) {
      this.submitData.nickName = data.nickName;
      this.submitData.email = data.email;
      this.submitData.password = data.password;
      this.submitData.phoneNumber = data.phoneNumber;

      this.loading = true;

      if (this.canGetAuthCode)
        getAuthCode(data.email).then((res) => {
          if (res.data.ok) {
            this.$message({
              type: "success",
              message: "成功向您的" + data.email + "邮箱发送了一个验证码",
            });
          } else this.$message.error("发送邮箱验证码出错，请稍后再试。");
        });
      else {
        this.$message({
          type: "warning",
          message: "您" + this.getTime + "秒内不可以获取新的验证码！",
        });
      }

      this.putInAuthCode();
      this.loading = false;
    },

    putInAuthCode() {
      this.canGetAuthCode = false;
      let a = setInterval(() => {
        this.getTime--;
        if (this.getTime == 0) {
          this.getTime = 60;
          this.canGetAuthCode = true;
          clearInterval(a);
        }
      },1000);

      this.$prompt("请输入我们刚刚发送到您邮箱的验证码：", "验证", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        inputPattern: /^[A-Z0-9]{6}$/,
        inputErrorMessage: "这不是一个有效的验证码",
      })
        .then(({ value }) => {
          console.log(value)
          this.submitData.code = value;
          return sendSignUpData(this.submitData);
        })
        .then((res) => {
          if (res.data.ok)
            this.$message({
              type: "success",
              message: "注册成功，即将跳转~",
            });

          setTimeout(() => {
            this.$router.replace("/login");
          }, 2000);

          console.log(res);
        });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.goToLogin {
  margin-top: 20px;
}
</style>