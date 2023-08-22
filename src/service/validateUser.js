import axios from "axios"

export const validateUser = async (token) => {
    const role = await axios.post(`http://localhost:8080/api/auth/validate`,{},{
        params: {
            token: token
        },
    });
    return role.data;
}

export const getUsername = async (token) => {
    const username = await axios.post(`http://localhost:8080/api/auth/getusername`, {},{
        params: {
            token: token
        },
    });
    return username.data;
}

export const login = async (username, password) => {
    let response = await axios.post('http://localhost:8080/api/auth/login',{
            username,
            password
    });
    return response;
}