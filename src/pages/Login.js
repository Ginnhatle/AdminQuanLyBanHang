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
                navigate("/home");
                window.location.reload();
            }, (error) => {
                console.log(error);
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (<>
        {/*<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">*/}
        {/*    <div className="sm:mx-auto sm:w-full sm:max-w-sm">*/}
        {/*        /!*<img*!/*/}
        {/*        /!*    className="mx-auto h-10 w-auto"*!/*/}
        {/*        /!*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*!/*/}
        {/*        /!*    alt="Your Company"*!/*/}
        {/*/>*/}
        {/*        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">*/}
        {/*            Sign in to your account*/}
        {/*        </h2>*/}
        {/*    </div>*/}

        {/*    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">*/}
        {/*        <form className="space-y-6" >*/}
        {/*            <div>*/}
        {/*                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">*/}
        {/*                    Username*/}
        {/*                </label>*/}
        {/*                <div className="mt-2">*/}
        {/*                    <input*/}
        {/*                        type="text"*/}
        {/*                        onChange={e=>setUsername(e.target.value)}*/}
        {/*                        required*/}
        {/*                        className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
        {/*                    />*/}
        {/*                </div>*/}
        {/*            </div>*/}

        {/*            <div>*/}
        {/*                <div className="flex items-center justify-between">*/}
        {/*                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">*/}
        {/*                        Password*/}
        {/*                    </label>*/}
        {/*                    <div className="text-sm">*/}
        {/*                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
        {/*                            Forgot password?*/}
        {/*                        </a>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="mt-2">*/}
        {/*                    <input*/}
        {/*                        id="password"*/}
        {/*                        name="password"*/}
        {/*                        type="password"*/}
        {/*                        autoComplete="current-password"*/}
        {/*                        required*/}
        {/*                        onChange={e=>setPassword(e.target.value)}*/}
        {/*                        className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
        {/*                    />*/}
        {/*                </div>*/}
        {/*            </div>*/}

        {/*            <div>*/}
        {/*                <button*/}
        {/*                    onClick={handleLogin}*/}
        {/*                    type="submit"*/}
        {/*                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
        {/*                >*/}
        {/*                    Sign in*/}
        {/*                </button>*/}
        {/*            </div>*/}
        {/*        </form>*/}

        {/*        <p className="mt-10 text-center text-sm text-gray-500">*/}
        {/*            Do not have an account?{' '}*/}
        {/*            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
        {/*                Start creating an account now*/}
        {/*            </a>*/}
        {/*        </p>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className={'w-full h-screen flex items-start'}>
            <div className={'relative w-1/2 h-full flex flex-col'}>
                <div className={'absolute top-[20%] left-[10%] flex flex-col'}>
                    <h1 className={'text-4xl text-white font-bold my-4'}>
                        Welcome to our wardrobe                    </h1>
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
                               onChange={e=>setUsername(e.target.value)}
                               className={'w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'}
                        />
                        <input type="password"
                               placeholder={'Password'}
                               onChange={e=>setPassword(e.target.value)}
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
                        <img src={googleImage} className={'w-5 mr-2'} alt=""/>
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
