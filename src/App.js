// import logo from './logo.svg';
// import 'App.css';
import EmailVerification from './components/email_verification';
import './styles/login.css';
import './styles/register_styles.css';
import './styles/email_verification.css';
import './styles/forget_password.css';
import './styles/reset_password.css';
import React from 'react';
import { Navigate,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import ForgotPassword from './components/forget_password';
import ResetPassword from './components/reset_password';


function App() {

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
    
  //   if (token) {

  //     axios.interceptors.request.use(
  //       (config) => {
  //         config.headers.Authorization = `Bearer ${token}`;
  //         return config;
  //       },
  //       (error) => Promise.reject(error)
  //     );
  //   }
  // }, []); 


  return (
    <Router>
       
    <div className="App">
      <Routes>
     
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgot-password" element= {<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
      </Routes>
    </div>
  </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App;
