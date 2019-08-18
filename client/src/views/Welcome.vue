<template>
  <div id="welcome">
    <el-dialog
      title="verifyStudent"
      visible.sync="verifyVisible"
      width="30%">
    </el-dialog>
    <div class="welcome-content" v-if="!addingStudent">
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
          :fetch-suggestions="querySearch"
          @select="handleNameSelect"
          >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix">
          </i>
        </el-autocomplete>
        <el-button
          type="text"
          @click="addStudent"
        >
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
      welcomeStringArray: ['Welcome', 'أهلا بك', '欢迎', 'Bienvenu', 'स्वागत हे', `Pjila'Si`,
        '환영', 'Karibu', 'સ્વાગત છે', 'Chào Mừng'],
      welcomeStringIndex: 0,
      welcomeTimer: 0,
      checkedIn: false,
      verifyVisible: false,
      studentNameArray: [],
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
      console.log('User has added student');
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
    handleNameSelect(value) {
      this.studentName = value;
    },
    querySearch(string, callback) {
      // eslint-disable-next-line
      console.log('querying strings', string);
      callback(this.welcomeStringArray);
    },
    setUpStudentNames() {
      this.allStudents.map((student) => {
        let name = `${student.firstName} ${student.lastName}`;
        this.studentNameArray.push(name);
        return student;
      });
    },
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