import Papa from 'papaparse';
import studentService from '../service/studentService.js';
import Vue from 'vue';

const state = {
    students: [],
    username: null,
    password: null,
};
 
const getters = {
    allStudents(state) {
        return state.students;
    },
};

const actions = {
    getAllStudents(store) {  
        studentService.getStudents().then((response) => {
            // eslint-disable-next-line
            console.log('students', response);
        });     
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
};

const mutations = {
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};