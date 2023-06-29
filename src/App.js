import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import AuthService from "./service/auth.service";
import {Home} from "./pages/home/Home";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css"
import {Admin} from "./pages/home/Admin";
import 'primeicons/primeicons.css';

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };
    return (
        <div className='overflow-hidden'>
            <Router>
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    {currentUser ?
                        <Route path={'/home'} element={<Home/>}/>
                        : ""}
                    {currentUser ?
                        <Route path={'/admin'} element={<Admin/>}/>
                        : ""}

                </Routes>
            </Router>

        </div>
    )
};

export default App;
