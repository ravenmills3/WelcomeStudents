import Papa from 'papaparse';
import studentService from './service/studentService.js';
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        students: [],
        username: null,
        password: null,
    },
     
    getters: {
        allStudents(state) {
            return state.students;
        },
        adminData(state) {
            return {
                username: state.username,
                password: state.password,
            };
        },
    },
    
    actions: {
        getAllStudents(store) {
            try {
                studentService.getStudents().then((response) => {
                    response.map((studentData) => {
                        let student = {
                            firstName: studentData['First Name'],
                            lastName: studentData['Last Name'],
                            country: studentData['Home Country'],
                            email: studentData['Personal Email'],
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
        getLogin(store) {
            Papa.parse('https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=view&id=1IgoqtnA_DvihuijMWP9s5vR4QoKT9qul', {
                download: true,
                header: true,
                complete: ((results) => {
                    if (results && results.data) {
                        if (results.data[0] && results.data[0].username && results.data[0].password) {
                            store.commit('setUsername', results.data[0].username);
                            store.commit('setPassword', results.data[0].password);
                        }
                    }
                    // eslint-disable-next-line
                    console.log('loaded loginData');
                }),
            });
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
                    country: studentPayload.country,
                }
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
        setUsername(state, payload) {
            state.username = payload;
        },
        setPassword(state, payload) {
            state.password = payload;
        },
        setStudents(state, student) {
            let studentList =  [...state.students];
            studentList.unshift(student);
            Vue.set(state, 'students', studentList);
        }
    },
});