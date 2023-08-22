import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../../sharedComponents/table/Table'
import './Accounts.css'
import Passbook from './passbook/Passbook';
import Error from '../../sharedComponents/error/Error'
import { getAccounts } from '../../../service/customerAPIs';

const Accounts = (props) => {

    const customerid = props.customerid;
    const token = localStorage.getItem('auth')

    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [showPassbook, setShowPassbook] = useState(false);
    const [accountnumber, setaccountnumber] = useState(null);
    const [balance, setBalance] = useState(null)
    const [error, setError] = useState(null)

    const tableHeaders = ["#", "Account Number", "Bank Name", "Balance", "Passbook"]

    
    const fetchAccounts = async () => {
        try{
            const response = await getAccounts(customerid, currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            let arr = []
            response.data.content.map((account, index) => {
                let data = [index+1, 
                    account.accountnumber,
                    account.bankname,
                    account.balance,
                    <button type="button" className="btn btn-success"
                    onClick={()=>showPassbookHandler(account.accountnumber, account.balance)}
                    >Passbook</button>
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const showPassbookHandler = async (accountnumber, balance) => {
        setaccountnumber(accountnumber)
        setBalance(balance)
        setShowPassbook(true)
    }

    useEffect(()=>{
        setShowPassbook(false)
        fetchAccounts();
    },[currentpageno, size])

    return (
        <> 
            {
                error && <Error error={error} setError={setError}/>
            }
            {
                !showPassbook && 
                <div className='accountsTable-wrapper'>
                    <Table
                        tableHeaders={tableHeaders} 
                        tableData={tableData}
                        currentpageno={currentpageno}
                        setCurrentpageno={setCurrentpageno}
                        totalpages={totalpages}
                        setSize={setSize}
                    />
                </div>
            }
            {
                showPassbook && 
                <Passbook setShowPassbook={setShowPassbook} accountnumber={accountnumber} balance={balance}/>
            }
        </>
    );
}

export default Accounts;
