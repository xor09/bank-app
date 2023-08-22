import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from '../../sharedComponents/table/Table'
import './Bank.css'
import Error from '../../sharedComponents/error/Error'
import { deleteBank, getbanks, saveBank, updateBank } from '../../../service/adminAPIs';


const Bank = () => {
    const token = localStorage.getItem("auth")

    const [addBank, setAddBank] = useState("");
    const [tableData, setTableData] = useState([]);
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    //for update bank
    const [curBankId, setCurrentBankId] = useState(0);
    const [curBankName, setCurrentBankName] = useState("Nothing");
    const [error, setError] = useState(null)

    const tableHeaders = ["#", "Bank Name", "UPDATE", "DELETE"]


    const fetchBanks = async() => {
        try{
            const response = await getbanks(currentpageno, size, token)
            setCurrentpageno(Math.min(currentpageno, response.data.totalPages));
            setTotalpages(response.data.totalPages);

            let arr = [];
            response.data.content.length && response.data.content.map((bank, index) => {
                let data = [index+1, 
                        bank.bankname, 
                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateBankModal"
                            onClick={() => {
                                setCurrentBankId(bank.bankid);
                                setCurrentBankName(bank.bankname)
                            }}
                            >UPDATE
                        </button>,
                        <button type="button" className="btn btn-danger" 
                            onClick={()=>deleteBankHandler(bank.bankid)}>DELETE
                        </button>
                ]
                
                arr.push(data);
            })
            setTableData(arr);
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const deleteBankHandler = async (bankid) => {
        try{ 
            const response = await deleteBank(bankid, token)
            fetchBanks();
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const saveBankUpdateHandle = async () => {
        try{
            const response = await updateBank(curBankId, curBankName, token);
            fetchBanks();           
        }catch(error){
            setError(error.response.data)
        }
        return
    }


    const saveBankHandle = async () => {
        if(addBank.length === 0){
            window.alert("Enter a valid bank name");
            return;
        }
        try{
            let response = await saveBank(addBank, token)
            setAddBank("");
            fetchBanks();
            document.getElementById("bank").value="";
            window.alert("Bank added successfully")
        }catch(error){
            setError(error.response.data)
        }
        return;
    }
    
    useEffect(()=>{
        fetchBanks();
    },[currentpageno, size])


    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            {/* Modal to Add Bank */}
            <div className='mx-3 my-4'>
                <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Bank</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" id="bank" 
                                placeholder='ex. State Bank of India'
                                onChange={(e) => setAddBank(e.target.value.trim())}
                                required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveBankHandle}>Save Bank</button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='float-end'><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Add Bank</button></p>
                <br/>
            </div>

            {/* Table Component */}
            <div className='table-wrapper'>
                 <Table 
                 tableHeaders={tableHeaders} 
                 tableData={tableData}
                 currentpageno={currentpageno}
                 setCurrentpageno={setCurrentpageno}
                 totalpages={totalpages}
                 setSize={setSize}
                 />
            </div>

            {/* Modal to update Bank */}
            <div className='mx-3 my-4'>
                <div className="modal fade" id="updateBankModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Bank</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" id="bank" 
                                onChange={(e) => setCurrentBankName(e.target.value)}
                                value={curBankName}
                                required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" 
                                onClick={saveBankUpdateHandle}
                                >Update Bank</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bank;
