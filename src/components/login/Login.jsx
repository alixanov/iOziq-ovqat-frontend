import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import axios from 'axios';

const Login = () => {
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();



     function loginUser() {
          const data = {
               login,
               password
          }
          axios
               .post("https://i-oziq-ovqat-backend.vercel.app/api/login", data)
               .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    window.location.reload();
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     return (
          <div className='login'>
               <form className='form' onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
                    <label>Логин</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Войти</button>
               </form>
          </div>
     );
};

export default Login;
