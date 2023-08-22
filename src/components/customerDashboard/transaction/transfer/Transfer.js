import axios from 'axios';
import React, { useState } from 'react';
import './Transfer.css'
import Error from '../../../sharedComponents/error/Error'
import { doTransfer } from '../../../../service/customerAPIs';

const Transfer = (props) => {
    const accounts = props.accounts
    const token = localStorage.getItem('auth')

    const [sender, setSender] = useState(-1)
    const [reciever, setReciver] = useState(-1)
    const [balance, setBalanace] = useState(-1)
    const [amount, setAmount] = useState(null);
    const [error, setError] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(sender == reciever){
            window.alert("sender and reciever account cannot be same")
            return;
        }
        if(sender === -1 || !amount || amount===0) return;
        try {
            const response = await doTransfer(sender, reciever, amount, token)
        } catch (error) {
            setError(error.response.data)
        }finally {
            resetField()
        }
        window.alert("Transfer Successful")
        return
    }

    const resetField = () =>{
        document.querySelector('#reciever').value = ''
        document.querySelector('#amount').value=''
    }

    return (
        <>
        {error && <Error error = {error} setError={setError}/>}
        <div className='transfer-wrapper'>
            <form className='border rounded shadow-lg p-3 '>
                <div className="mb-3">
                    <label for="selectsender" className="form-label d-flex justify-content-between">
                        Select Your sender
                        {
                            balance!=-1 && <strong>Balance: {balance}</strong>
                        }
                    </label>
                    <select className="form-select" id="selectsender" onChange={(e)=>{
                        const [accountnumber, balance] = e.target.value.split(',');
                        setSender(parseInt(accountnumber))
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
                    <label for="reciever" className="form-label">Enter Reciver account number</label>
                    <input type="number" className="form-control" id="reciever" placeholder="example: 123456" 
                        onChange={(e) => setReciver(parseInt(e.target.value))}
                    />
                </div>
                <div className="mb-3">
                    <label for="amount" className="form-label">Enter Transfer Amount</label>
                    <input type="number" className="form-control" id="amount" placeholder="example: 5000" 
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className='d-flex justify-content-end gap-3'>
                    <button type="submit" 
                    className={!reciever || reciever===-1 || sender === -1 || !amount || amount==0 ? "btn btn-success disabled" : "btn btn-success"} 
                    onClick={onSubmitHandler}>Submit</button>
                    <button type="reset" className="btn btn-danger"
                    onClick={()=>{
                        // resetField()
                        setSender(-1)
                        setReciver(-1)
                        setBalanace(0)
                        setAmount(null)
                    }}
                    >Reset</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Transfer;
