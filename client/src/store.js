import studentService from './service/studentService.js';
import userService from "./service/userService";
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        students: [],
        authenticated: false,
    },
     
    getters: {
        allStudents(state) {
            return state.students;
        },
        userAuthenticated(state) {
            return state.authenticated;
        }
    },
    
    actions: {
        getAllStudents(store) {
            try {
                studentService.getStudents().then((response) => {
                    response.map((studentData) => {
                        let student = {
                            firstName: studentData['Fname'],
                            lastName: studentData['Lname'],
                            pronoun: studentData['Pronoun(s)'],
                            email: studentData['Email'],
                            dbID: studentData['_id'],
                        };
                        store.commit('setStudents', student);
                    })
                    // eslint-disable-next-line
                    console.log('loaded student data');
                });
            } catch(error) {
                // eslint-disable-next-line
                console.log('Error loading student data');
            }
        },
        loginUser(store, userPayload) {
            try {
                userService.loginUser(userPayload).then(() => {
                    store.commit('setUserAuthenticated', true);
                    // eslint-disable-next-line
                    console.log('User has successfully logged in');
                });
            } catch (error) {
                // eslint-disable-next-line
                console.log('Error logging in user');
                store.commit('setUserAuthenticated', false);
                throw(error);
            }
        },
        checkInStudent(store, studentPayload) {
            try {
                studentService.checkInStudent(studentPayload.dbID);
                setTimeout(() => {
                    store.dispatch('getAllStudents');
                }, 1000);
                // eslint-disable-next-line
                console.log('Student has been successfully checked in');
            } catch(error) {
                // eslint-disable-next-line
                console.log('Error checking in student');
            }
        },
        addStudent(store, studentPayload) {
            try {
                let params = {
                    firstName: studentPayload.firstName,
                    lastName: studentPayload.lastName,
                    studentID: studentPayload.id,
                    email: studentPayload.email,
                    pronoun: studentPayload.pronoun,
                };
                studentService.addStudent(params);
                setTimeout(() => {
                    store.dispatch('getAllStudents');
                }, 1000);
                // eslint-disable-next-line
                console.log('Student has been successfully added');
            } catch(error) {
                // eslint-disable-next-line
                console.log('Error adding student');
            }
        },
    },
    
    mutations: {
        setStudents(state, student) {
            let studentList =  [...state.students];
            studentList.unshift(student);
            Vue.set(state, 'students', studentList);
        },
        setUserAuthenticated(state, value) {
            Vue.set(state, 'authenticated', value);
        }
    },
});
