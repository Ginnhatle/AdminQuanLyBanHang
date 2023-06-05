import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

export const Home = () => {
    const state = ({

    })
    const [data, setData] = useState([]);
    const [material, setMaterial] = useState([]);
    const [color, setColor] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/product/?page=1&size=5')
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/categories')
            .then(res => setDataCategory(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/discount')
            .then(res => setDataDiscount(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/material')
            .then(res => setMaterial(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/colors')
            .then(res => setColor(res.data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/sizes')
            .then(res => setSizes(res.data))
            .catch(err => console.log(err))

    }, [])
    const handleDelete = async (id) => {
        const conf = window.confirm("Do you want to delete")
        if (conf) {
            axios.delete('http://localhost:3030/mv-core/v1/admin/product/delete/' + id)
                .then(res => {
                    alert('record has deleted');
                    return navigate('/home');
                }).catch(err => console.log(err))
        }
    }
    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text"/>
            <Button label="Submit" icon="pi pi-check" onClick={() => setShowModal(false)} autoFocus/>
        </div>
    );
    return (
        <>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar" type="button"
                    className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                                <span
                                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path
                                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                                <span
                                    className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">Name</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
                                            <th scope="col" className="px-6 py-4">Description</th>
                                            <th scope="col" className="px-6 py-4">Operation</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data.data?.map((user, index) => {
                                                return <tr className="border-b dark:border-neutral-500" id={user}
                                                           key={index}>
                                                    {user.status === "NEW" ?

                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            {user?.id}</td> : ""}
                                                    {user.status === "NEW" ?
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            {user.name}</td> : ""}
                                                    {user.status === "NEW" ?
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            c</td> : ""}
                                                    {user.status === "NEW" ?
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            c</td> : ""}
                                                    {user.status === "NEW" ?
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">

                                                            <Button label="Update" icon="pi pi-external-link"
                                                                    onClick={() => setShowModal(true)}/>

                                                            <button onClick={event => handleDelete(user.id)}
                                                                    className="rounded-full bg-red-600 w-20 p-2">
                                                                Delete
                                                            </button>
                                                        </td> : ""}
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    <div className="p-2">
                                        <Button label="Create" icon=" pi pi-external-link"
                                                onClick={() => setShowModal(true)}/>
                                    </div>
                                    <Dialog className={"flex"} header="Create" visible={showModal}
                                            style={{width: '50vw'}}
                                            onHide={() => setShowModal(false)} footer={footerContent}>
                                        <div className={"flex items-center justify-between p-2"}>
                                            < Dropdown value={dataBrand?.data} onChange={(e) => setDataBrand(e.value)}
                                                       options={dataBrand?.data} optionLabel="name"
                                                       placeholder="Brand" className="w-2/5"/>
                                            < Dropdown value={dataCategory?.data}
                                                       onChange={(e) => setDataCategory(e.value)}
                                                       options={dataCategory?.data} optionLabel="name"
                                                       placeholder="Category" className="w-2/5 "/>
                                        </div>

                                        <div className={"flex items-center justify-between p-2"}>

                                            < Dropdown value={dataDiscount?.data}
                                                       onChange={(e) => setDataDiscount(e.value)}
                                                       options={dataDiscount?.data} optionLabel="name"
                                                       placeholder="Discount" className="w-2/5"/>
                                            < Dropdown value={material?.data} onChange={(e) => setMaterial(e.value)}
                                                       options={material?.data} optionLabel="name"
                                                       placeholder="Material" className="w-2/5"/>
                                        </div>
                                        <div className={"flex items-center justify-between p-2"}>

                                            < Dropdown value={color?.data} onChange={(e) => setColor(e.value)}
                                                       options={color?.data} optionLabel="name"
                                                       placeholder="Color" className="w-2/5"/>
                                            < Dropdown value={sizes?.data} onChange={(e) => setSizes(e.value)}
                                                       options={sizes?.data} optionLabel="name"
                                                       placeholder="Sizes" className="w-2/5"/>
                                        </div>
                                        <div className={"flex p-2"}>
                                            <InputText className={"w-full "} type="text" placeholder="Name" />
                                        </div>
                                        <div className={"flex items-center justify-between p-2"}>
                                        <InputText keyfilter="int" placeholder="Price" className={'w-2/5'}/>
                                        <InputText keyfilter="int" placeholder="Quantity" className={'w-2/5'}/>
                                        </div>
                                        <div className={"flex items-center justify-between p-2"}>
                                            <InputTextarea rows={5} cols={30} className=" w-full" placeholder={"Description"} />
                                        </div>
                                    </Dialog>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
