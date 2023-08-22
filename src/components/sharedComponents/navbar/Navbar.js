import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const data = props.data;
    const field = props.field;
    const setField = props.setField;
    const navigation = useNavigate();

    const logoutHandle = () =>{
        localStorage.removeItem("auth");
        navigation("/");
        return;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand"><p>{data.firstname} {data.lastname}</p></div>
                    <div>
                    {
                        data.user.role.rolename === "ROLE_ADMIN" ?
                            (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className={field==="BANK" ? "nav-item h5" : "nav-item"}>
                                    <p className="nav-link" onClick={()=>setField("BANK")}>Bank</p>
                                </li>
                                <li className={field==="CUSTOMER" ? "nav-item h5" : "nav-item"}>
                                    <p className="nav-link" onClick={()=>setField("CUSTOMER")}>Customer</p>
                                </li>
                                <li className={field==="ACCOUNT" ? "nav-item h5" : "nav-item"}>
                                    <p className="nav-link" onClick={()=>setField("ACCOUNT")}>Account</p>
                                </li>
                            </ul>) :
                            
                            (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className={field==="ACCOUNTS" ? "nav-item h5" : "nav-item"}>
                                    <p className="nav-link" onClick={()=>setField("ACCOUNTS")}>Accounts</p>
                                </li>
                                <li className={field==="TRANSACTION" ? "nav-item h5" : "nav-item"}>
                                    <p className="nav-link" onClick={()=>setField("TRANSACTION")}>Transaction</p>
                                </li>
                            </ul>)
                    }
                    </div>
                    
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    <button className="btn btn-danger" type="submit" onClick={logoutHandle}>Logout</button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
