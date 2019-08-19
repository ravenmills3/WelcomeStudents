<template>
  <div id="welcome">
    <el-dialog
      title="Is This You?"
      :visible.sync="verifyStudent"
      width="80%">
      <span>
        <span class="student-info-wrapper">
          Name: {{ studentInfo.value }}
          Country: {{ studentInfo.country }}
          Email: {{ studentInfo. email }}
        </span>
      </span>
      <span slot="footer" class="verify-footer">
        <el-button
          class="cancel-check-button"
          type="text"
          @click="cancelCheckIn">
          Cancel
        </el-button>
        <el-button
          class="check-in-button"
          plain
          @click="checkIn">
          Check In
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Enter Your Information"
      :visible.sync="addingStudent"
      width="80%">
      <el-form :model="addFormInfo">
        <el-form-item label="First name" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.firstName" autocomplete="off" placeholder="John"></el-input>
        </el-form-item>
        <el-form-item label="Last name" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.lastName" autocomplete="off" placeholder="Smith"></el-input>
        </el-form-item>
        <el-form-item label="Student Id" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.id" autocomplete="off" placeholder="1234567"></el-input>
        </el-form-item>
        <el-form-item label="Country" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.country" autocomplete="off" placeholder="Canada"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="addFormInfo.email" autocomplete="off" placeholder="john.smith@email.com"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="welcome-content" v-if="!addingStudent && !verifyStudent">
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
          v-if="registerStudent"
          type="text"
          @click="addStudent">
          Can't Find Your Name?
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Welcome',
  components: {
  },
  data() {
    return {
      studentName: null,
      addingStudent: false,
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
      },
      welcomeStringArray: [
        'Welcome',
        'أهلا بك',
        '欢迎',
        'Bienvenu',
        'स्वागत हे',
        `Pjila'Si`,
        '환영',
        'Karibu',
        'સ્વાગત છે',
        'Chào Mừng',
        'Bem Vinda',
        'приветствовать',
        'स्वागतम',
        'Wamkelekile',
        'Kaabọ',
        'die Begrüßung',
        'ようこそ！',
        'Nnọọ',
        'خوش باش'
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
    addStudent() {
      // eslint-disable-next-line
      console.log('User is adding a student');
      this.addingStudent = true;
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
        this.registerStudent = true;
      } else {
        this.registerStudent = false;
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
        });
        return student;
      });
    },
    cancelCheckIn(){
      // eslint-disable-next-line
      console.log('User has cancelled check in');
    },
    checkIn() {
      // eslint-disable-next-line
      console.log('User has checked in');
    }
  },
  mounted() {
    this.changeWelcomeString();
    this.setUpStudentNames();
  },
}
</script>
<style lang="scss">
#welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
      font-weight: 700;
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
      }

      .el-button {
        margin-top: 20px;
        color: rgba(0, 0, 0, 1);
        text-decoration: underline;
      }
    }
  }
}
</style>