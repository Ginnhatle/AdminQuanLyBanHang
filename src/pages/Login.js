import axios from "axios";
import {useNavigate, useHistory} from "react-router-dom";
import {useState} from "react";
import AuthService from "../service/auth.service";
import imageLogin from "../img/header2.jpg"
import googleImage from "../img/google.png"

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(username, password).then(() => {
                navigate("/admin");
                window.location.reload();
            }, (error) => {
            });
        } catch (err) {
        }
    };
    return (<>
        <div className={'w-full h-screen flex items-start'}>
            <div className={'relative w-1/2 h-full flex flex-col'}>
                <div className={'absolute top-[20%] left-[10%] flex flex-col'}>
                    <h1 className={'text-4xl text-white font-bold my-4'}>
                        Welcome to our wardrobe </h1>
                    <p className={'text-xl text-white font-normal'}>Please login to shop here.</p>
                </div>
                <img src={imageLogin} className={'w-full h-full object-cover'}/>
            </div>
            <div className={'w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'}>
                <h1 className={'text-xl text-[#060606] font-semibold'}>
                    Mens-Wardrobe
                </h1>
                <div className={'w-full flex flex-col max-w-[500px]'}>
                    <div className="w-full flex flex-col mb-2">
                        <h3 className={'text-3xl font-semibold mb-5'}>Login</h3>
                        <p className={'text-base mb-2'}>Wellcome back! Please enter your detail.</p>
                    </div>
                    <div className={'w-full flex flex-col'}>
                        <input type="text"
                               placeholder={'Username'}
                               onChange={e => setUsername(e.target.value)}
                               className={'w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'}
                        />
                        <input type="password"
                               placeholder={'Password'}
                               onChange={e => setPassword(e.target.value)}
                               className={'w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'}
                        />
                    </div>
                    <div className={'w-full flex items-center justify-between'}>
                        <div className={'w-full flex items-center'}>
                            <input type="checkbox" className={'w-4 h-4 mr-2'}/>
                            <p className={'text-sm'}>Remember me for 30 day</p>
                        </div>
                        <div className={'w-full flex justify-end'}>
                            <p className={'text-sm font-medium whitespace-normal cursor-pointer underline underline-offset-2'}>Forgot
                                Password?</p>
                        </div>

                    </div>
                    <div className={'w-full flex flex-col my-4'}>
                        <button
                            onClick={handleLogin}
                            className={'w-full text-white bg-[#060606] font-semibold rounded-md my-2 p-3 text-center flex items-center justify-center'}>
                            Log in
                        </button>
                        <button
                            className={'w-full text-[#060606] bg-white font-semibold border-2 border-black rounded-md my-2 p-3 text-center flex items-center justify-center'}>
                            Register
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className={'w-full h-[1px] bg-black'}>
                        </div>
                        <p className={'text-lg absolute text-black/80 bg-[#f5f5f5]'}>or</p>
                    </div>
                    <div
                        className={'w-full text-[#060606] bg-white font-semibold border-2 border-black rounded-md my-2 p-3 text-center flex items-center justify-center cursor-pointer'}>
                        <img src={googleImage} className={'w-1 mr-1'} alt=""/>
                        Sign In With Google
                    </div>
                </div>
                <div className={'w-full flex items-center justify-center'}>
                    <p className={'text-sm font-normal text-[#060606]'}>Don't have a account</p>
                    <span
                        className={'font-semibold underline underline-offset-2 cursor-pointer'}>Sign up for free</span>
                </div>

            </div>
        </div>
    </>)
}
