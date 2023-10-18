import axios from 'axios'
import Qs from 'qs'

const LoginHandler = async (data) => {

    const login_api = '/auth'
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
            console.log(`accessToken: ${JSON.stringify(response.data.data.accessToken)}`);
            return true
        })
        .catch((error) => {
            console.log('Login failed:', error.message)
            return false
        });

    return result
}

export { LoginHandler }