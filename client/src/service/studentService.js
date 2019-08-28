import axios from 'axios';

const url = 'api/students/';

class studentService {
    // Get Students

    static getStudents() {
        return new Promise(async (resolve, reject) => {
            try {
                const response  = await axios.get(url);
                resolve(response.data);
            } catch(error) {
                reject(error);
            }
        })
    }
    // Create Students
    static addStudent(studentParams) {
        return axios.post(url, { ...studentParams });
    }

    // Update/Check In Students
    static checkInStudent(dbID) {
        return axios.put(`${url}${dbID}`);
    }
}

export default studentService;