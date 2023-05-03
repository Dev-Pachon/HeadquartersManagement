import axios from '../utils/axios'

export const LOGIN = '/auth'

const login = (credentials) => {
    return axios.post(LOGIN, credentials)
}

const AuthService = {
    login
};

export default AuthService;