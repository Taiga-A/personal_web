<template>
  <div class="loginFrom">
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <div class="inputContent">
        电话号码/邮箱：
        <el-input v-model="formLabelAlign.user"></el-input>
      </div>
      <div class="inputContent">
        密码：
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </div>
    </el-form>
    <el-button
      :type="buttonType"
      :loading="loading"
      style="width: 100%; margin-top: 20px;"
      @click="submitForm()"
      >登录</el-button
    >
  </div>
</template>

<script>
import { boxAlert } from "../../util/alert";
import { emailTest, phoneNumberTest, passwordTest } from "../../util/inputTest";

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
    submitForm() {
      if (
        !(
          emailTest(this.formLabelAlign.user, (data) => {
            (this.userData.value = data), (this.userData.type = "email");
          }) ||
          phoneNumberTest(
            this.formLabelAlign.user,
            (data) => {
              (this.userData.value = data),
                (this.userData.type = "phoneNumber");
            },
            (data) => {
              if (!data) boxAlert("请输入电话号码或邮箱", this);
              else {
                boxAlert("这并不是一个有效的电话号码或邮箱", this);
                this.formLabelAlign.user = "";
              }
            }
          )
        )
      )
        return;
      if (
        !passwordTest(
          this.formLabelAlign.password,
          (data) => {
            this.userData.password = data;
          },
          (data) => {
            if (!data) boxAlert("请输入密码", this);
            else {
              boxAlert(
                "密码格式不正确，密码应为6-20个大小写字母数字或 . _ - ",
                this
              );
              this.formLabelAlign.password = "";
            }
          }
        )
      )
        return;

      this.$emit("loginSubmit", this.userData);
    },
  },
};
</script>

<style>
.loginFrom {
  width: 400px;
}
.inputContent {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
  line-height: 25px;
}
</style>