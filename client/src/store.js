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
                        };
                        store.commit('addStudent', student);
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
    },
    
    mutations: {
        setUsername(state, payload) {
            state.username = payload;
        },
        setPassword(state, payload) {
            state.password = payload;
        },
        addStudent(state, student) {
            let studentList =  [...state.students];
            studentList.unshift(student);
            Vue.set(state, 'students', studentList);
        }
    },
});