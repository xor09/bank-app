import React, { useEffect } from 'react';
import './Customer.css'
import { useState } from 'react';
import axios from 'axios';
import Table from '../../sharedComponents/table/Table'
import Error from '../../sharedComponents/error/Error'
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from '../../../service/adminAPIs';

const Customer = () => {
    const token = localStorage.getItem('auth')
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [currentpageno, setCurrentpageno] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, setTotalpages] = useState(1);
    const [tableData, setTableData] = useState([]);

    const [currentCustomerId, setCurrentCustomerId] = useState(0);
    const [currentCustomerFirstname, setCurrentCustomerFirstname] = useState('');
    const [currentCustomerLastname, setCurrentCustomerLastname] = useState('');
    const [error, setError] = useState(null)

    const tableHeaders = ["#", "Customer ID", "Name", "Role", "Count of Accounts", "UPDATE", "DELETE"];
    
    const fetchCustomer = async () => {
        try{
            const response = await getCustomers(currentpageno, size, token)
            setCurrentpageno(currentpageno);
            setTotalpages(response.data.totalPages);
            let arr = []
            response.data.content.map((customer, index) => {
                let data = [index+1, 
                    customer.customerid,
                    customer.firstname+" "+customer.lastname, 
                    customer.role,
                    customer.role === "CUSTOMER" ? customer.accountCount : "Not Eligible",
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateCustomerModal"
                                onClick={() => {
                                setCurrentCustomerId(customer.customerid)
                                setCurrentCustomerFirstname(customer.firstname)
                                setCurrentCustomerLastname(customer.lastname)
                            }}
                            >UPDATE</button>,
                            <button type="button" className=
                            {customer.role === "CUSTOMER" ? "btn btn-danger" : "btn btn-danger disabled"}
                            onClick={()=>deleteCustomerHandler(customer.customerid)}>DELETE</button>
                        ]
                arr.push(data);
            })
            setTableData(arr);
        }catch(error){
            setError(error.response.data)
        }
        return;
    }
    
    const saveCustomerUpdateHandler = async () =>{
        try{
            const response = await updateCustomer(currentCustomerId, currentCustomerFirstname, currentCustomerLastname, token)
            fetchCustomer();
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const deleteCustomerHandler = async (customerid) => {
        try{
            const response = await deleteCustomer(customerid, token)
            fetchCustomer();
        }catch(error){
            setError(error.response.data)
        }
        return;
    }

    const saveCustomer = async () => {
        try{
            const response = await addCustomer(firstname, lastname, username, password, token)
            fetchCustomer();
            window.alert("Customer Added")
        }catch(error){
            setError(error.response.data)
        }
    }

    useEffect(()=>{
        fetchCustomer()
    },[currentpageno, size])

    return (
        <>
            {
                error && <Error error={error} setError={setError}/>
            }
            <div>
                <div className='addCustomer-wrapper'>
                    <div>
                        <p className='float-end'><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCustomerModal">Add Customer</button></p>
                    </div>
                </div>
                <div className='customerTable-wrapper'>
                    <Table 
                        tableHeaders={tableHeaders} 
                        tableData={tableData}
                        currentpageno={currentpageno}
                        setCurrentpageno={setCurrentpageno}
                        totalpages={totalpages}
                        setSize={setSize}
                        />
                </div>

                {/* add customer modal */}
                <div className='mx-3 my-4'>
                    <div className="modal fade" id="addCustomerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Customer</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control" id="firstname" 
                                    placeholder='Firstname'
                                    onChange={(e) => setFirstname(e.target.value.trim())}
                                    required
                                    /><br/>
                                    <input type="text" className="form-control" id="lastname" 
                                    placeholder='lastname'
                                    onChange={(e) => setLastname(e.target.value.trim())}
                                    required
                                    /><br/>
                                    <input type="text" className="form-control" id="username" 
                                    placeholder='username'
                                    onChange={(e) => setUsername(e.target.value.trim())}
                                    required
                                    /><br/>
                                    <input type="text" className="form-control" id="password" 
                                    placeholder='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    /><br/>
                                    <p><b>Note:</b> <i>All fields are required</i></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" 
                                    className={firstname.length && lastname.length && username.length
                                        && password.length ? "btn btn-primary" : "btn btn-primary disabled"} 
                                    onClick={saveCustomer}>Save Customer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* update customer modal */}
                <div className='mx-3 my-4'>
                    <div className="modal fade" id="updateCustomerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Customer</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control" id="customerFirstname" 
                                    onChange={(e) => setCurrentCustomerFirstname(e.target.value)}
                                    value={currentCustomerFirstname}
                                    required
                                    />
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control" id="customerLastname" 
                                    onChange={(e) => setCurrentCustomerLastname(e.target.value)}
                                    value={currentCustomerLastname}
                                    required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" 
                                    onClick={saveCustomerUpdateHandler}
                                    >Update Customer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Customer;
