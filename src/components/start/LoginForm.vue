<template>
  <div class="loginFrom">
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="电话号码/邮箱">
        <el-input v-model="formLabelAlign.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="margin-top: -20px">
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button
      :type="buttonType"
      :loading="loading"
      style="width: 100%"
      @click="submitForm()"
      >提交</el-button
    >
  </div>
</template>

<script>
export default {
  name: "loginForm",
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        user: "",
        password: "",
      },

      userData: {
        value: "",
        type: "",
        password: "",
      },
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    userAlert(mes, clear) {
      this.$alert(mes, {
        confirmButtonText: "确定",
        callback: () => {
          if (clear && clear.user) this.formLabelAlign.user = "";
          if (clear && clear.password) this.formLabelAlign.passWord = "";
        },
      });
    },
    userTest(user) {
      let emailReg = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
      let phoneReg = /^[0-9]{9,14}$/;

      if (!user) {
        this.userAlert("请输入手机号码或邮箱！");
        return 0;
      }

      if (emailReg.test(user)) {
        (this.userData.type = "email"), (this.userData.value = user);
      } else if (phoneReg.test(user)) {
        (this.userData.type = "phoneNumber"), (this.userData.value = user);
      } else {
        this.userAlert("请输入正确的电话号码或邮箱", { user: true });
        return 0;
      }

      return 1;
    },
    passwordTest(password) {
      let passReg = /^[a-zA-Z0-9_.-]{6,20}$/;

      if (!password) {
        this.userAlert("请输入密码");
        return 0;
      }

      if (passReg.test(password)) {
        this.userData.password = password;
        return 1;
      } else {
        this.userAlert(
          "密码格式不正确，密码应为6位及以上20位一下，且仅包含大小写字母、数字以及‘ - _ . ’。",
          { password: true }
        );
      }
    },
    submitForm() {
      if (!this.userTest(this.formLabelAlign.user)) return;
      if (!this.passwordTest(this.formLabelAlign.password)) return;
      this.$emit('loginSubmit',this.userData)
    },
  },
};
</script>

<style>
.loginFrom {
  width: 400px;
}
</style>