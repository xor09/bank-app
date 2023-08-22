import axios from "axios";

export const getAdmin = async (username, token) => {
    let response = await axios.get(`http://localhost:8080/customer/getadmin/${username}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getaccounts = async(currentpageno, size, token) => {
    const response = await axios.get("http://localhost:8080/account/getaccounts",{
        params: {
            pageno: currentpageno-1,
            size: size
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const fetchAllBanks = async(token) =>{
    const response = await axios.get("http://localhost:8080/bank/getallbanks",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteAccount = async(accountnumber, token) => {
    const response = await axios.delete(`http://localhost:8080/account/deleteaccount/${accountnumber}`,{
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return response;
}

export const saveAccount = async(bankid, customerid, initialbalance, token) => {
    const response = await axios.post(`http://localhost:8080/account/addaccount/${bankid}/${customerid}`,{
        balance: initialbalance
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}


export const getbanks = async(currentpageno, size, token) => {
    const response = await axios.get("http://localhost:8080/bank/getbanks",{
        params: {
            pageno: currentpageno - 1,
            size: size
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteBank = async(bankid, token) =>{
    const response = await axios.delete(`http://localhost:8080/bank/deletebank/${bankid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return response;
}

export const updateBank = async (curBankId, curBankName, token) => {
    const response = await axios.put(`http://localhost:8080/bank/updatebank/${curBankId}`,{
        bankname: curBankName.trim()
    },{
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return response;
}

export const saveBank = async (addBank, token) => {
    let response = await axios.post('http://localhost:8080/bank/addbank', 
    {
        bankname: addBank
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getCustomers = async (currentpageno, size, token) => {
    const response = await axios.get("http://localhost:8080/customer/getcustomers",{
        params: {
        pageno: currentpageno-1,
        size: size
    },
    headers: {
        Authorization: `Bearer ${token}`
    }
    })
    return response;
}

export const updateCustomer = async (currentCustomerId, currentCustomerFirstname, currentCustomerLastname, token) => {
    const response = await axios.put(`http://localhost:8080/customer/admin/updatecustomer/${currentCustomerId}`,{
        firstname: currentCustomerFirstname.trim(),
        lastname: currentCustomerLastname.trim()
    },{
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return response;
}

export const deleteCustomer = async (customerid, token) =>{
    const response = await axios.delete(`http://localhost:8080/customer/deletecustomer/${customerid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return response;
}


export const addCustomer = async (firstname, lastname, username, password, token) => {
    const response = await axios.post("http://localhost:8080/api/auth/register/2",
    {
        firstname,
        lastname,
        user: {
            username,
            password
        }
    },
    {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}