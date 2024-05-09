import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = "http://localhost:8080";


/** Make API Requests */

export async function verifyEmail({email}) {
    try {
        const {data, status} = await axios.post('http://localhost:2024/api/auth/forgotPassword', {email: email})
        return {data, status};
    } catch (error) {
        return Promise.reject(error)
    }
}


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
// export async function authenticate(username){
//     try {
//         return await axios.post('https://api.purposeblacketh.com/api/auth/login', { username })
//     } catch (error) {
//         return { error : "Username doesn't exist...!"}
//     }
// }

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`http://localhost:8080/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`http://localhost:8080/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('http://localhost:2024/api/auth/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

// /** generate OTP */
// export async function generateOTP(username){
//     try {
//         const {data : { code }, status } = await axios.get('http://localhost:8080/api/generateOTP', { params : { username }});

//         // send mail with the OTP
//         if(status === 201){
//             let { data : { email }} = await getUser({ username });
//             let text = `Dear Share Holder This is verify code ${code}. Plase do not share This code just use it.`;
//             await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
//         }
//         return Promise.resolve(code);
//     } catch (error) {
//         return Promise.reject({ error });
//     }
// }

/** verify OTP */
export async function verifyOTP({ otp }) {
    try {
      const { data, status } = await axios.post('http://localhost:2024/api/auth/verifyOTP', { otp: otp });
      return { data, status };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('http://localhost:8080/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}