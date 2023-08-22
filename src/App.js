
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import CustomerDashboard from './components/customerDashboard/CustomerDashboard';

function App() {
  return (
    <>
     <Routes>
      <Route exect path='/' element={<Login />}/>
      <Route  path='/admindashboard/:username' element={<AdminDashboard />} />
      <Route  path='/customerdashboard/:username' element={<CustomerDashboard />} />
     </Routes>
    </>
  );
}

export default App;
