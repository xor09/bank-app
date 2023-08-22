import React, { useEffect, useState } from 'react';
import Deposit from './deposit/Deposit';
import './Transaction.css'
import Withdraw from './withdraw/Withdraw';
import Transfer from './transfer/Transfer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from '../../sharedComponents/error/Error'
import { getAllCustomerAccounts } from '../../../service/customerAPIs';


const Transaction = (props) => {
    const token = localStorage.getItem('auth')
    const customerid = props.customerid;

    const [transactiontype, setTransactiontype] = useState("DEPOSIT");
    const [accounts, setAccounts] = useState([]);
    const [update, setUpdate] = useState(1);
    const [error, setError] = useState(null)

    const fetchAccounts = async () => {
        try{
            const response = await getAllCustomerAccounts(customerid, token)
            setAccounts(response.data.content)
        }catch(error){
            setError(error.response.data)
        }
       
    }

    useEffect(()=>{
        fetchAccounts()
    },[])

    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            <div className='transaction-wrapper'>
                <div className='radioButton-wrapper'>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="transaction" id="deposit" defaultChecked
                            onClick={()=>setTransactiontype("DEPOSIT")}
                        />
                        <label class="form-check-label" for="deposit">
                            Deposit
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="transaction" id="withdraw" 
                        onClick={()=>setTransactiontype("WITHDRAW")}
                        />
                        <label class="form-check-label" for="withdraw">
                            Withdraw
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="transaction" id="transfer" 
                        onClick={()=>setTransactiontype("TRANSFER")}
                        />
                        <label class="form-check-label" for="transfer">
                            Transfer
                        </label>
                    </div>
                </div>
                {transactiontype === "DEPOSIT" && <Deposit accounts = {accounts}/>}
                {transactiontype === "WITHDRAW" && <Withdraw accounts = {accounts}/>}
                {transactiontype === "TRANSFER" && <Transfer accounts = {accounts}/> }
            </div>
        </>
    );
}

export default Transaction;
