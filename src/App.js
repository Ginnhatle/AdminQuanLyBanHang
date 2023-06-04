import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import AuthService from "./service/auth.service";
import {Home} from "./pages/Home";

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

                    }
                </Routes>
            </Router>

        </div>
    )
};

export default App;
