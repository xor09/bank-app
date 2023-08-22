import React, { useState } from 'react';
import './Deposit.css'
import axios from 'axios';
import Error from '../../../sharedComponents/error/Error'
import { doDeposit } from '../../../../service/customerAPIs';

const Deposit = (props) => {
    const accounts = props.accounts
    const token = localStorage.getItem('auth')

    const [account, setAccount] = useState(-1)
    const [balance, setBalanace] = useState(-1)
    const [amount, setAmount] = useState(null);
    const [error, setError] = useState(null)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(account === -1 || !amount || amount===0) return;
        try{
            const response = await doDeposit(account, amount, token)
            window.alert("Deposit Successful")
        }catch(error){
            setError(error.response.data)
        }finally{
            resetField()
        }
        return
    }

    const resetField = () =>{
        document.querySelector('#amount').value=''
    }

    return (
        <>
            {error && <Error error = {error} setError={setError}/>}
            <div className='disposit-wrapper'>
                <form className='border rounded shadow-lg p-3 '>
                    <div className="mb-3">
                        <label for="selectAccount" className="form-label d-flex justify-content-between">
                            Select Your Account
                            {
                                balance!=-1 && <strong>Balance: {balance}</strong>
                            }
                        </label>
                        <select className="form-select" id="selectAccount" onChange={(e)=>{
                            const [accountnumber, balance] = e.target.value.split(',');
                            setAccount(parseInt(accountnumber))
                            setBalanace(parseInt(balance))
                        }}>
                            <option value={"-1,-1"} >Select an account</option>
                            {
                                accounts.map((account, index) =>
                                    <option key={index+1}value={`${account.accountnumber},${account.balance}`} >
                                        Account Number: {account.accountnumber}
                                    </option>
                                )
                            }
                        </select>
                        
                        
                    </div>
                    <div className="mb-3">
                        <label for="amount" className="form-label">Enter Deposit Amount</label>
                        <input type="number" className="form-control" id="amount" placeholder="example: 5000" 
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-end gap-3'>
                        <button type="submit" 
                        className={account === -1 || !amount || amount==0 ? "btn btn-success disabled" : "btn btn-success"} 
                        onClick={onSubmitHandler}>Submit</button>
                        <button type="reset" className="btn btn-danger"
                        onClick={()=>{
                            setAccount(-1)
                            setBalanace(-1)
                            setAmount(null)
                        }}
                        >Reset</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Deposit;
