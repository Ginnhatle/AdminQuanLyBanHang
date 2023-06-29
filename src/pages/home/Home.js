import { useState } from 'react';
import { TabMenu } from "primereact/tabmenu";
import { Brand } from "../../components/Brand";
import { Product } from "../../components/product";
import { Material } from "../../components/Material";
import { Color } from "../../components/Color";
import { Size } from "../../components/Size";
import Footer from "../../commons/Footer";
import Header from "../../commons/Header";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import AuthService from "../../service/auth.service";

export const Home = () => {
    const logOut = () => {
        AuthService.logout();
        window.location.href = '/';
    };
    const items = [
        {
            label: 'Admin', icon: 'pi pi-fw pi-home', command: () => {
                window.location.href = '/admin';
            }
        },
        { label: 'Dashboard', icon: 'pi pi-fw pi-material' },
        { label: 'Contact', icon: 'pi pi-fw pi-pencil' },
        { label: 'Setup', icon: 'pi pi-fw pi-cog' },
        { label: 'Profile', icon: 'pi pi-fw pi-file' }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40"
        className="mr-2"></img>;
    const end = <Button label="Đăng xuất" icon="pi pi-sign-out" link onClick={logOut} />;

    return (<div>
        <div className="card">
            <Menubar model={[]} start={start} end={end} />
        </div>
        {/*<Footer></Footer>*/}
    </div>

    )
}
