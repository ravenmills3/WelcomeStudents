<template>
  <div
    id="login"
  >
    <div class="login-modal">
      <div class="login-text-wrapper">
        Welcome!
      </div>
      <div class="login-input-wrapper">
        <div class="username-text">
          Username
        </div>
        <el-input
          type="text"
          suffix-icon="el-icon-user"
          placeholder="Username"
          v-model="localUser"
        />
        <div class="password-text">
          Password
        </div>
        <el-input
          type="password" 
          placeholder="Password"
          :show-password=true
          v-model="localPassword"
        ></el-input>
      </div>
      <div class="login-submit-wrapper">
        <el-button
          type="primary"
          class="login-button"
          @click="localLogin"
          plain
        >Sign In</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      localUser: '',
      localPassword: '',
      loginError: false,
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async localLogin() {
      if (this.localUser != "" && this.localPassword != "") {
        try {
          // eslint-disable-next-line
          await this.loginUser({
            username: this.localUser,
            password: this.localPassword,
          })
          this.$router.push('welcome');
        } catch (error) {
          this.localPassword = '';
          this.$message({
            showClose: false,
            message: 'There was an error logging in. Please check username and password',
            type: 'error',
            duration: 2500, 
          });
        }
      } else {
        this.$message({
          showClose: false,
          message: 'Please enter all information',
          type: 'error',
          duration: 2500, 
        });
      }
    },
  },
}
</script>
<style lang="scss">
@font-face {
  font-family: unbFont;
  src: url('../assets/ProximaNova-Regular.ttf');
}
@font-face {
  font-family: unbFontBold;
  src: url('../assets/ProximaNova-Bold.otf');
}
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    rgba(200,200,200,0),
    rgba(200, 200, 200, 0.1),
    rgba(200, 200, 200, 0.4)
    ), url(../assets/ISAOBackground.jpg);
  background-color: linear-gradient(
    rgba(213, 67, 37, 1),
    rgba(213, 67, 37, 0.1),
    rgba(213, 67, 37, 0.4),
  );
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-modal {
    width: 50%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(200, 200, 200, 0.6);
    border-radius: 8px;

    .login-text-wrapper {
      text-align: center;
      height : 16%;
      width: 100%;
      padding: 20px 0px;
      font-size: 32px;
      font-weight: 400;
      font-family: unbFontBold;
    }
    .login-input-wrapper {
      height: 50%;
      width: 80%;

      .username-text,
      .password-text {
        text-align: center;
        padding: 8px 0px;
      }
    }
    .login-submit-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;

      .el-button {
        height: 36px;
        font-family: unbFont;
        color: rgba(204, 0, 0, 1);
        background-color: rgb(252, 209, 200);
        border-color: rgb(250, 117, 91);
      }
    }
  }
}
</style>
