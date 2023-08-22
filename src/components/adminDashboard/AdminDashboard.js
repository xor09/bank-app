import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../sharedComponents/navbar/Navbar'
import Customer from './customer/Customer';
import Account from './account/Account';
import Bank from './bank/Bank';
import { getUsername, validateUser } from '../../service/validateUser';
import Error from '../sharedComponents/error/Error'
import { getAdmin } from '../../service/adminAPIs';

const AdminDashboard = () => {
    const naviagtion = useNavigate();
    const username = useParams().username;
    const token = localStorage.getItem('auth');
    const [admin, setAdmin] = useState(null);
    const [field, setField] = useState(null);
    const [error, setError] = useState(null);


    const fetchAdmin = async() => {
        let token = localStorage.getItem('auth');
        try{
            let response = await getAdmin(username, token)
            setAdmin(response.data)
        }catch(error){
            setError(error.response.data)
        }
        return
    }

    const validation = async () => {
        if(!token){
            naviagtion('/')
            return;
        }
        let role = await validateUser(token);
        let customer = await getUsername(token);
        if(role !== "ROLE_ADMIN" || customer!==username){
            naviagtion('/')
            return;
        }

        fetchAdmin();
        setField("BANK")
    }

    useEffect(() => {
        validation();
    }, []);

    
    

    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            {admin && <Navbar data={admin} field={field} setField={setField}/>}
            {field && field==="BANK" && <Bank />}
            {field && field==="CUSTOMER" && <Customer />}
            {field && field==="ACCOUNT" && <Account />}
        </>
    );
}

export default AdminDashboard;
