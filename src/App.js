import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import {Login} from "./pages/Login";
import AuthService from "./service/auth.service";

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
    return(
        <div className='overflow-hidden'>

            <Router>
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    {/*{currentUser?*/}
                        <Route path={'/home'} element={<Home/>}/>
                    {/*:("")*/}
                    }
                    {/*{currentUser?*/}
                        <Route path={'/product/:id'} element={<ProductDetails/>}/>
                    {/*:("")*/}
                    }
                </Routes>
                <Sidebar/>
            </Router>

        </div>
    )
};

export default App;
