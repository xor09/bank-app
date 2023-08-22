import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../sharedComponents/navbar/Navbar'
import Accounts from './accounts/Accounts';
import Transaction from './transaction/Transaction';
import { getUsername, validateUser } from '../../service/validateUser';
import Error from '../sharedComponents/error/Error'
import { getCustomer } from '../../service/customerAPIs';



const CustomerDashboard = () => {
    const naviagtion = useNavigate();
    const username = useParams().username;
    const token = localStorage.getItem('auth');
    const [customer, setCustomer] = useState(null);
    const [field, setField] = useState(null);
    const [error, setError] = useState(null)

    const fetchCustomer = async() => {
        try{
            let response = await getCustomer(username, token)
            setCustomer(response.data)
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const validation = async () => {
        if(!token){
            naviagtion('/')
            return;
        }
        let role = await validateUser(token)
        let customer = await getUsername(token)
        if(role !== "ROLE_CUSTOMER" || customer!==username){
            naviagtion('/')
            return;
        }
       

        fetchCustomer();
        setField("ACCOUNTS")
    }

    useEffect(() => {
        validation();
    }, []);


    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            {customer && <Navbar data = {customer} field={field} setField={setField}/>}
            {field && field === "ACCOUNTS" && customer && <Accounts customerid = {customer.customerid}/>}
            {field && field === "TRANSACTION" && customer && <Transaction customerid = {customer.customerid}/>}
        </>
    );
}

export default CustomerDashboard;
