import EmailVerification from './pages/email_verification_page/email_verification';
import '../src/pages/login_page/login.css';
import '../src/pages/register_page/register.css';
import './pages/email_verification_page/email_verification.css';
import '../src/pages/forget_password_page/forget_password.css';
import '../src/pages/reset_password_page/reset_password.css';
import React from 'react';
import { Navigate,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login_page/login';
import Register from './pages/register_page/register';
import Home from './pages/home_page/home';
import ForgotPassword from './pages/forget_password_page/forget_password';
import ResetPassword from './pages/reset_password_page/reset_password';

function App() {
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
  )
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "./components/main_layout/main_layout";
// import Home from "./pages/home_page/home";
// import Login from "./pages/login_page/login";
// import Register from "./pages/register_page/register";
// import EmailVerification from "./pages/email_verification_page/email_verification";
// import ForgotPassword from "./pages/forget_password_page/forget_password";
// import ResetPassword from "./pages/reset_password_page/reset_password";
// import GeneralChat from "./pages/general_chat_page/general_chat";
// import Profile from "./pages/profile_page/profile";


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="general-chat-rooms" element={<GeneralChat />} />

//           <Route path="verify-email" element={<EmailVerification />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="reset_password" element={<ResetPassword />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
