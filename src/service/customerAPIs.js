import axios from "axios";

export const getCustomer = async (username, token) =>{
    const response = await axios.get(`http://localhost:8080/customer/getcustomer/${username}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const getAccounts = async (customerid, currentpageno, size, token) => {
    const response = await axios.get(`http://localhost:8080/account/getaccounts/${customerid}`,
    {
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

export const getTransactions = async (accountnumber, currentpageno, size, token) => {
    const response = await axios.get(`http://localhost:8080/transaction/transactions/${accountnumber}`,
    {
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

export const getAllCustomerAccounts = async (customerid, token) => {
    const response = await axios.get(`http://localhost:8080/account/getaccounts/${customerid}`,
    {
        params: {
            pageno: 0,
            size: 1000
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const doDeposit = async (account, amount, token) => {
    const response = await axios.post(`http://localhost:8080/transaction/deposit/${account}/${amount}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const doTransfer = async (sender, reciever, amount, token) => {
    const response = await axios.post(`http://localhost:8080/transaction/transfer/${sender}/${reciever}/${amount}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const doWithdraw = async (account, amount, token) => {
    const response = await axios.post(`http://localhost:8080/transaction/withdraw/${account}/${amount}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}