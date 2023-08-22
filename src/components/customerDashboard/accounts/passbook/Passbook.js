import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../sharedComponents/table/Table'
import './Passbook.css'
import Error from '../../../sharedComponents/error/Error'
import { getTransactions } from '../../../../service/customerAPIs';

const Passbook = (props) => {
    const token = localStorage.getItem('auth')
    const setShowPassbook = props.setShowPassbook;
    const accountnumber = props.accountnumber;
    const balance = props.balance;

    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null)

    const tableHeaders = ["#", "Transaction ID", "Sender/Reciever", "Amount", "Transaction Type", "Date", "Time"]

    const fetchTransactions = async () => {
        try{
            const response = await getTransactions(accountnumber, currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            
            let arr = []
            response.data.content.map((transaction, index) => {
                let [date, time] = transaction.date.split(/[T.]/);
                let data = [index+1, 
                    transaction.transactionid,
                    transaction.accountnumber1,
                    transaction.amount,
                    transaction.transactiontype,
                    date,
                    time
                ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const HandleBackButton = () => {
        setShowPassbook(false)
    }

    useEffect(()=>{
        fetchTransactions()
    },[currentpageno, size])

    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            <div>
                <div className='backButtonBalance-wrapper'>
                    <button type="button" class="btn btn-info" onClick={HandleBackButton}> <strong>BACK</strong></button>
                    <div className='bg-info p-3 border rounded-2'><strong>Balance: {balance}</strong></div>
                </div>
                <div className='passbookTable-wrapper'>
                    <Table
                        tableHeaders={tableHeaders} 
                        tableData={tableData}
                        currentpageno={currentpageno}
                        setCurrentpageno={setCurrentpageno}
                        totalpages={totalpages}
                        setSize={setSize}
                    />
                </div>
            </div>
        </>
    );
}

export default Passbook;
