import axios from '../utils/axios'

const AUTH_HEADER = "Bearer "

export const HEADQUARTERS = '/headquarters'

const getAll = () => {
    return axios.get(HEADQUARTERS)
}

const get = (id, token) => {
    const URL = HEADQUARTERS+"/"+id
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const create = (body, token) => {
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.post(HEADQUARTERS, body, config)
}

const update = (body, id, token) => {
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    const URL = HEADQUARTERS+"/"+id
    return axios.put(URL, body, config)
}

const remove = (id, token) => {
    const URL = HEADQUARTERS+"/"+id
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.delete(URL, config)
}

const findByName = (name, token) => {
    const URL = HEADQUARTERS+"?name="+name
    const config = {
        headers:{
            "Authorization": AUTH_HEADER+token
        }   
    }
    return axios.get(URL, config)
}

const HeadquarterService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};

export default HeadquarterService;