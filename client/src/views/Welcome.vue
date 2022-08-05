<template>
  <div id="welcome">
    <el-dialog
      title="Is This You?"
      :visible.sync="verifyStudent"
      :before-close="cancelCheckIn"
      custom-class="verify-dialog"
      width="80%"
      center>
      <span class="student-info-wrapper">
          <span class="student-name"> Name: {{ studentInfo.value }}</span>
          <span class="student-country" v-if="studentInfo.country"> Country: {{ studentInfo.country }}</span>
          <span class="student-email" v-if="studentInfo.email"> Email: {{ studentInfo. email }}</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel-check-button"
          type="text"
          @click="cancelCheckIn">
          Cancel
        </el-button>
        <el-button
          class="check-in-button"
          @click="checkIn">
          Check In
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Enter Your Information"
      :visible.sync="registerStudent"
      :before-close="cancelCheckIn"
      width="80%">
      <el-form :model="addFormInfo">
        <el-form-item label="First name" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.firstName" autocomplete="off" placeholder="John"></el-input>
        </el-form-item>
        <el-form-item label="Last name" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.lastName" autocomplete="off" placeholder="Smith"></el-input>
        </el-form-item>
        <el-form-item label="Student #" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.id" autocomplete="off" placeholder="1234567"></el-input>
        </el-form-item>
        <el-form-item label="Country" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.country" autocomplete="off" placeholder="Canada"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.email" autocomplete="off" placeholder="john.smith@email.com"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel-check-button"
          type="text"
          @click="cancelCheckIn">
          Cancel
        </el-button>
        <el-button
          class="check-in-button"
          @click="checkIn">
          Check In
        </el-button>
      </span>
    </el-dialog>
    <div class="welcome-content" v-if="!registerStudent && !verifyStudent">
      <transition name="fade" mode="out-in">
        <div class="welcome-header" v-bind:key="welcomeString">
          {{ welcomeString }}
        </div>
      </transition>
      <div class="welcome-modal">
        <el-autocomplete
          class="name-input"
          v-model="studentName"
          placeholder="Enter Name"
          :trigger-on-focus="false"
          :fetch-suggestions="queryStudents"
          @select="handleNameSelect">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-autocomplete>
        <el-button
          v-if="!inDatabase"
          type="text"
          @click="addingStudent">
          Can't Find Your Name?
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Welcome',
  components: {
  },
  data() {
    return {
      studentName: null,
      inDatabase: true,
      registerStudent: false,
      welcomeStringIndex: 0,
      welcomeTimer: 0,
      checkedIn: false,
      verifyStudent: false,
      formLabelWidth: '120px',
      studentNameArray: [],
      addFormInfo: {
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        id: '',
      },
      studentInfo: {
        value: null,
        country: null,
        email: null,
        dbID: null,
      },
      welcomeStringArray: [
        'Welcome',
        'Nnọọ',
        '歡迎',
        'Bienvenu',
        'خوش آمدید',
        'स्वागत हे',
        `Pjila'Si`,
        'Bienvenida',
        'Sannu da zuwâ',
        '환영합니다',
        'સ્વાગત છે',
        'Ób’ókhían',
        'Welkom',
        'Chào Mừng',
        'स्वागतम',
        'ようこそ',
        'Herzlich Willkommen',
        'Xoş gəlmişsiniz',
        'Tervetuloa',
        'Selamat Datang',
        'Ek’abo',
        'Murakaza neza',
        'வாருங்கள்',
        'أهلاً و سهلاً',
      ],
    }
  },
  computed: {
    ...mapGetters(['allStudents']),
    welcomeString() {
      return this.welcomeStringArray[this.welcomeStringIndex];
    },
  },
  methods: {
    ...mapActions(['checkInStudent', 'addStudent']),
    addingStudent() {
      // eslint-disable-next-line
      console.log('User is adding a student');
      this.registerStudent = true;
    },
    setWelcomeString() {
      if (this.welcomeStringIndex >= this.welcomeStringArray.length) {
        this.welcomeStringIndex = 0;
      } else {
        ++this.welcomeStringIndex;
      }
    },
    changeWelcomeString() {
      clearInterval(this.welcomeTimer);
      this.setWelcomeString();
      setTimeout(() => {
        this.changeWelcomeString();
      }, 3000);
    },
    handleNameSelect(student) {
      this.studentName = student.value;
      this.studentInfo = { ...student };
      // eslint-disable-next-line
      console.log('Verifying student');
      this.verifyStudent = true;
    },
    queryStudents(queryString, cb) {
      let students = [...this.studentNameArray];
      let queryResults = queryString ? students.filter(this.nameFilter(queryString)) : students;
      if (queryResults.length === 0) {
        this.inDatabase = false;
      } else {
        this.inDatabase = true;
      }
      cb(queryResults);
    },
    nameFilter(queryString) {
      return (student) => {
        return (student.value.toLowerCase().includes(queryString.toLowerCase()));
      }
    },
    setUpStudentNames() {
      this.allStudents.map((student) => {
        let name = `${student.firstName} ${student.lastName}`;
        this.studentNameArray.push({
          value: name,
          country: student.country,
          email: student.email,
          dbID: student.dbID,
        });
        return student;
      });
    },
    cancelCheckIn() {
      this.resetStudentInfo();
      this.resetFormInfo();
      this.studentName = '';
      this.registerStudent = false;
      this.verifyStudent = false;
      this.inDatabase = true;
      // eslint-disable-next-line
      console.log('User has cancelled check in');
    },
    checkIn() {
      let payload;
      if (this.verifyStudent) {
        payload = { dbID: this.studentInfo.dbID };
        this.checkInStudent(payload);
      } else if (this.registerStudent) {
        payload = { ...this.addFormInfo };
        this.addStudent(payload);
      }
      // eslint-disable-next-line
      console.log('User has checked in!');
      this.$router.push('check');
    },
    resetStudentInfo() {
      this.studentInfo = {
        value: null,
        country: null,
        email: null,
        dbID: null,
      };
    },
    resetFormInfo() {
      this.addFormInfo = {
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        id: '',
      };
    },
  },
  mounted() {
    this.changeWelcomeString();
    this.setUpStudentNames();
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

#welcome {
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

  .welcome-content {
    width: 80%;
    height: 60%;

    .welcome-header {
      height: 60%;
      display: flex;
      justify-content: center;
      align-content: center;
      color: rgba(0, 0, 0, 1);
      font-size: 64px;
      font-family: unbFontBold;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

    .welcome-modal {
      height: 40%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .el-autocomplete {
        width: 80%;
        font-family: unbFont;
      }

      .el-button {
        margin-top: 20px;
        color: rgba(0, 0, 0, 1);
        text-decoration: underline;
        font-family: unbFontBold;
        font-size: 16px;
      }
    }
  }
}
.el-dialog {
  font-family: unbFontBold;
  font-size: 28px;

  .el-dialog__body {
    font-family: unbFont;
    color: rgba(0, 0, 0, 1);

    .student-info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .student-name, .student-country, .student-email {
        padding-top: 12px;
        font-size: 20px;
      }
    }
    
    .el-input {
      font-family: unbFont;
    }
  }

  .dialog-footer {
    font-family: unbFont;

    .cancel-check-button {
      color: rgba(204, 0, 0, 1);
    }
    .check-in-button {
      color: rgb(132, 189, 0);
      border-color: rgb(169, 211, 72);
      background-color: rgb(224, 243, 181);
    }
  }
}
.el-popper {
  font-family: unbFont;
}
</style>