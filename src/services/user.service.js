import axios from '../utils/axios'

const AUTH_HEADER = "Bearer "

export const USERS = '/users'

const getAll = (token) => {

    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }

    return axios.get(USERS, config)
}

const get = (id, token) => {
    const URL = USERS+"/"+id
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const create = (body) => {
    return axios.post(USERS, body)
}

const update = (body, id, token) => {
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    const URL = USERS+"/"+id
    return axios.put(URL, body, config)
}

const remove = (id, token) => {
    const URL = USERS+"/"+id
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.delete(URL, config)
}

const findByFirstname = (firstname, token) => {
    const URL = USERS+"?firstname="+firstname
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const findByLastname = (lastname, token) => {
    const URL = USERS+"?lastname="+lastname
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const findByHeadquarter = (headquarter, token) => {
    const URL = USERS+"?headquarter="+headquarter
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByFirstname,
    findByLastname,
    findByHeadquarter
};

export default UserService;