import { useState } from 'react';
import { TabMenu } from "primereact/tabmenu";
import { Brand } from "../../components/Brand";
import { Product } from "../../components/product";
import { Material } from "../../components/Material";
import { Color } from "../../components/Color";
import { Size } from "../../components/Size";
import { Discount } from "../../components/Discount";
import { Account } from "../../components/Account";
import { Order } from "../../components/Order";
import Footer from "../../commons/Footer";
import { Home } from "./Home";

export const Admin = () => {
    const [activeIndex, setActiveIndex] = useState(3);
    const items = [
        { label: 'Brand', icon: 'pi pi-fw pi-home' },
        { label: 'Material', icon: 'pi pi-fw pi-material' },
        { label: 'Color', icon: 'pi pi-fw pi-pencil' },
        { label: 'Size', icon: 'pi pi-fw pi-cog' },
        { label: 'Discount', icon: 'pi pi-fw pi-cog' },
        { label: 'Product', icon: 'pi pi-fw pi-file' },
        { label: 'Order', icon: 'pi pi-fw pi-cog' },
        { label: 'Account', icon: 'pi pi-fw pi-cog' },
    ];

    return (<div>
        <Home></Home>
        <div className="card">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 ?
                <Brand></Brand> : ""
            }
            {activeIndex === 1 ?
                <Material></Material> : ""
            }
            {activeIndex === 2 ?
                <Color /> : ""
            }
            {activeIndex === 3 ?
                <Size /> : ""
            }
            {activeIndex === 4 ?
                <Discount /> : ""
            }
            {activeIndex === 5 ?
                <Product /> : ""
            }
            {activeIndex === 6 ?
                <Order /> : ""
            }
            {activeIndex === 7 ?
                <Account /> : ""
            }
        </div>
        <Footer></Footer>
    </div>

    )
}
