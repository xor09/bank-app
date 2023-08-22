import React, { useEffect, useState } from 'react';
import './Account.css'
import Table from '../../sharedComponents/table/Table'
import axios from 'axios';
import Error from '../../sharedComponents/error/Error';
import { getaccounts, fetchAllBanks, deleteAccount, saveAccount } from '../../../service/adminAPIs';

const Account = () => {
    const token = localStorage.getItem('auth')
    const [bankid, setBankid] = useState(null)
    const [customerid, setCustomerid] = useState(null)
    const [initialbalance, setInitialBanlance] = useState(null)
    const [banks, setBanks] = useState([])
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null)

    const tableHeaders = ["#", "Account Number", "Customer ID", "Bank Name", "Balance", "UPDATE", "DELETE"]
    
    const fetchAccount = async () => {
        try{
            const response = await getaccounts(currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            let arr = []
            response.data.content.map((account, index) => {
                let data = [index+1, 
                    account.accountnumber,
                    account.customerid,
                    account.bankname,
                    account.balance,
                    <button type="button" className="btn btn-warning disabled" data-bs-toggle="modal" data-bs-target="#updateCustomerModal">UPDATE</button>,
                    <button type="button" className="btn btn-danger"
                    onClick={()=>deleteAccountHandler(account.accountnumber)}
                    >DELETE</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const getAllBanks = async () => {
        try{
            const response = await fetchAllBanks(token)
            setBanks(response.data)
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const deleteAccountHandler = async (accountnumber) => {
        try{
            const response = await deleteAccount(accountnumber, token)
            fetchAccount();
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const saveAccountHandler = async () => {
        try{
            const response = await saveAccount(bankid,customerid,initialbalance,token);
            fetchAccount();
        }catch(error){
            setError(error.response.data);
        }
       
        return;
    }

    useEffect(()=>{
        fetchAccount();
        getAllBanks();
    },[currentpageno, size])

    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            <div>
            <div className='addAccount-wrapper'>
                    <div>
                        <p className='float-end'><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAccountModal">Add Account</button></p>
                    </div>
                </div>
                
                <div className='accountTable-wrapper'>
                    <Table
                        tableHeaders={tableHeaders} 
                        tableData={tableData}
                        currentpageno={currentpageno}
                        setCurrentpageno={setCurrentpageno}
                        totalpages={totalpages}
                        setSize={setSize}
                    />
                </div>

                {/* add account */}
                <div className='mx-3 my-4'>
                    <div className="modal fade" id="addAccountModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Account</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <select className="custom-select" onChange={(e) => setBankid(e.target.value)}>
                                        <option value={0}>Select a bank</option>
                                        {
                                            banks.map((bank, index) => 
                                                <option value={bank.bankid} key={index}>{bank.bankname}</option>)
                                        }
                                    </select><br />
                                    <input type="number" className="form-control mt-4" id="customerid" 
                                        placeholder="Enter Customer ID"
                                        onChange={(e) => setCustomerid(e.target.value)}
                                        required
                                    /><br/>
                                    <input type="number" className="form-control" id="initialBalance" 
                                        min={500}
                                        placeholder="Enter inital balance. Example: 5000"
                                        onChange={(e) => setInitialBanlance(e.target.value)}
                                        required
                                    /><br/>
                                    <div>
                                        <h5>Note: </h5>
                                        <i>All fields are required</i> <br/>
                                        <i>Minimum Initial Balance should be atleast <b>5000</b></i>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" 
                                    className={bankid && bankid>0 && customerid && customerid>0 && initialbalance && initialbalance>=5000 ? "btn btn-primary" : "btn btn-primary disabled"} 
                                    onClick={saveAccountHandler}
                                    >Save Customer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;
