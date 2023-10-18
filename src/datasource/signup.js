import axios from 'axios'
import Qs from 'qs'

const RegisterHandler = async (data) => {

    const login_api = '/register'
    const user = data.get('useremail')
    const pwd = data.get('password')

    let params = { user: user, pwd: pwd }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_OIDC_URL + login_api,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: Qs.stringify(params)
    };

    const result = await axios.request(config)
        .then((response) => {
            console.log(`message: ${JSON.stringify(response.data.type)}`);
            return true
        })
        .catch((error) => {
            console.log('Register failed:', error.message)
            return false
        });

    return result
}

export { RegisterHandler }