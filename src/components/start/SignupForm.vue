<template>
  <div class="loginFrom">
    <div style="margin: 20px"></div>
    <el-form label-width="80px" :model="userData">
      <el-form-item label="昵称*">
        <el-input
          maxlength="20"
          :show-word-limit="true"
          v-model="userData.nickName"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input type="phoneNumber" v-model="userData.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="邮箱*">
        <el-input type="email" v-model="userData.email"></el-input>
      </el-form-item>
      <el-form-item label="密码*">
        <el-input type="password" v-model="userData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码*">
        <el-input type="password" v-model="userData.rPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button
      :type="buttonType"
      :loading="loading"
      style="width: 50%; margin-top: 20 px"
      @click="submitForm()"
      >提交</el-button
    >
  </div>
</template>

<script>
import {boxAlert} from '../../util/alert'
import {
  passwordTest,
  phoneNumberTest,
  emailTest,
} from '../../util/inputTest'

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
      if(!this.userData.nickName) {
        boxAlert('昵称不能为空',this)
        return
      }

      if(this.userData.phoneNumber && !phoneNumberTest(
        this.userData.phoneNumber,
        ()=>{},
        ()=>{
          boxAlert('电话号码格式不正确',this)
          this.userData.phoneNumber = ''
        }
        )
      ) return

      if(!emailTest(
        this.userData.email,
        ()=>{},
        (data)=>{
          if(!data) boxAlert('邮箱不能为空',this)
          else {
            boxAlert('邮箱格式不正确',this)
            this.userData.email = ''
          }
        }
      )) return

      if(!passwordTest(
        this.userData.password,
        ()=>{},
        (data)=>{
          if(!data) boxAlert('请输入密码',this)
          else{
            boxAlert('密码格式不正确，密码应为6-20个大小写字母数字或 . _ - ',this)
            this.userData.password = ''
          }
        }
      )) return

      if(this.userData.rPassword == '') {
        boxAlert('请再次输入密码',this)
        return
      }

      if(this.userData.rPassword != this.userData.password) {
        boxAlert('两次输入的密码不正确',this)
        this.userData.rPassword = ''
        return
      }

      this.$emit("loginSubmit", this.userData)
    }
  }
};
</script>

<style>
.loginFrom {
  width: 400px;
}
</style>