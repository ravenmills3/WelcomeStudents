import axios from 'axios';

const url = 'login';

class userService {
    // Login User
    static loginUser(userParams) { 
        return new Promise(async (resolve, reject) => {
            try {
                const response  = axios.post(url, { ...userParams });
                resolve(response.data);
            } catch(error) {
                reject(error);
            }
        })
    }
}

export default userService;