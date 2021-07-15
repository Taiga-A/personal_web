<template>
  <div class="loginFrom">
    <div style="margin: 20px"></div>
    <el-form label-width="80px" label-position="top" :model="userData">
      <div class="inputContent">
        用户昵称*：
        <el-tooltip
          class="item"
          effect="dark"
          content="起个好听点儿的名字吧"
          placement="right-start"
        >
          <el-input
            maxlength="20"
            :show-word-limit="true"
            v-model="userData.nickName"
          ></el-input>
        </el-tooltip>
      </div>
      <div class="inputContent">
        电话号码：

        <el-tooltip
          class="item"
          effect="dark"
          content="为保护隐私可不用填写，也用作登录"
          placement="right-start"
        >
          <el-input
            type="phoneNumber"
            v-model="userData.phoneNumber"
          ></el-input>
        </el-tooltip>
      </div>
      <div class="inputContent">
        电子邮箱*：

        <el-tooltip
          class="item"
          effect="dark"
          content="登录及找回密码的重要凭证"
          placement="right-start"
        >
          <el-input type="email" v-model="userData.email"></el-input>
        </el-tooltip>
      </div>
      <div class="inputContent">
        密码*：

        <el-tooltip
          class="item"
          effect="dark"
          content="6-20位，大小写字母、数字 以及 . _ -"
          placement="right-start"
        >
          <el-input type="password" v-model="userData.password"></el-input>
        </el-tooltip>
      </div>
      <div class="inputContent">
        确认密码*：
        <el-tooltip
          class="item"
          effect="dark"
          content="确保您真的知道设置的密码"
          placement="right-start"
        >
          <el-input type="password" v-model="userData.rPassword"></el-input>
        </el-tooltip>
      </div>
    </el-form>
    <el-button
      :type="buttonType"
      :loading="loading"
      style="width: 100%; margin-top: 25px"
      @click="submitForm()"
      >注册</el-button
    >
  </div>
</template>

<script>
import { boxAlert } from "../../util/alert";
import { passwordTest, phoneNumberTest, emailTest } from "../../util/inputTest";

export default {
  name: "signupForm",
  data: () => {
    return {
      userData: {
        nickName: "",
        phoneNumber: "",
        email: "",
        password: "",
        rPassword: "",
      },
    };
  },
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    buttonType: {
      default: "primary",
      type: String,
    },
  },
  methods: {
    submitForm() {
      if (!this.userData.nickName) {
        boxAlert("昵称不能为空", this);
        return;
      }

      if (
        this.userData.phoneNumber &&
        !phoneNumberTest(
          this.userData.phoneNumber,
          () => {},
          () => {
            boxAlert("电话号码格式不正确", this);
            this.userData.phoneNumber = "";
          }
        )
      )
        return;

      if (
        !emailTest(
          this.userData.email,
          () => {},
          (data) => {
            if (!data) boxAlert("邮箱不能为空", this);
            else {
              boxAlert("邮箱格式不正确", this);
              this.userData.email = "";
            }
          }
        )
      )
        return;

      if (
        !passwordTest(
          this.userData.password,
          () => {},
          (data) => {
            if (!data) boxAlert("请输入密码", this);
            else {
              boxAlert(
                "密码格式不正确，密码应为6-20个大小写字母数字或 . _ - ",
                this
              );
              this.userData.password = "";
            }
          }
        )
      )
        return;

      if (this.userData.rPassword == "") {
        boxAlert("请再次输入密码", this);
        return;
      }

      if (this.userData.rPassword != this.userData.password) {
        boxAlert("两次输入的密码不正确", this);
        this.userData.rPassword = "";
        return;
      }

      this.$emit("signUpSubmit", this.userData);
    },
  },
};
</script>

<style>
.loginFrom {
  width: 400px;
}

.inputContent {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
  line-height: 25px;
}
</style>