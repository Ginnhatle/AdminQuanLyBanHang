import {useEffect} from "react";
import axios from "axios";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {TabMenu} from "primereact/tabmenu";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {InputTextarea} from "primereact/inputtextarea";
import {Brand} from "../components/Brand";
import {Product} from "../components/product";
import {useNavigate} from "react-router-dom";
import {Material} from "../components/Material";

export const Home = () => {
    const [activeIndex, setActiveIndex] = useState(3);
    const [dataBrand, setDataBrand] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataMaterial, setDataMaterial] = useState([]);

    const items = [
        {label: 'Brand', icon: 'pi pi-fw pi-home'
            // , routerLink: 'home/brand'
        },
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Product', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/material')
            .then(res => setDataMaterial(res.data))
            .catch(err => console.log(err))

    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <Button type="button" icon="pi pi-filter-slash" label="Add" outlined
                        onClick={() => setShowModal(true)}
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        // value={globalFilterValue} onChange={onGlobalFilterChange}
                        placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();
    const navigate = useNavigate();

    return (
        <div className="card">
            <Button onClick={() => setActiveIndex(0)} className="p-button-outlined mb-5" label="Activate 1st" />
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex==0?
                <Brand></Brand>:""
            }
            {activeIndex==1?
                <Material></Material>: ""
            }
            {activeIndex==4?
                <Product></Product>:""
            }
        </div>
    )
}
