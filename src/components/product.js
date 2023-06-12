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
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {useNavigate} from "react-router-dom";
import {Fieldset} from "primereact/fieldset";

export const Product = () => {
    const [dataBrand, setDataBrand] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");


    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => console.log(err))
        initFilters();
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text/>;
    const paginatorRight = <Button type="button" icon="pi pi-download" text/>;

    const [formData, setFormData] = useState({
        brandid: 0,
        categoryid: 0,
        description: "",
        discountid: 0,
        materialid: 0,
        name: "",
        price: 0,
        productDetailRequests: [
            {
                colorid: 0,
                discountid: 0,
                productDetailId: 0,
                quantity: 0,
                sizeid: 0
            }
        ]
    });
    // const {
    //     brandid,
    //     categoryid,
    //     description,
    //     discountid,
    //     materialid,
    //     name,
    //     price,
    //     colorid,
    //     productDetailId,
    //     quantity,
    //     sizeid
    // } = formData;
    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value});
    // };
    const [data, setData] = useState([]);
    const [material, setMaterial] = useState([]);
    const [color, setColor] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/products/')
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (userId && id && title && body) {
        axios.post('http://localhost:3030/mv-core/v1/admin/products/create/', formData)
            .then(res => {
                console.log(res,1111)

                setData([...data, res.data]);


            })
            .catch(err => console.log(err))

        // }
    };
    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text"/>
            <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} autoFocus/>
        </div>
    );


    const onChangeData = (value, name) => {
        let _data = {...formData}
        _data.productDetailRequests[name] = value
        console.log(_data)
        setFormData(_data)
    }
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const initFilters = () => {
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS},
            name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},

        });
        setGlobalFilterValue('');
    };
    const clearFilter = () => {
        initFilters();
    };
    const renderHeader = () => {
        return (<div className="flex items-center justify-between">
            <Button type="button" icon="pi pi-filter-slash" label="Add" outlined
                    onClick={() => setShowModal(true)}
            />
            <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText
                        value={globalFilterValue} onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"/>
                </span>
        </div>);
    };
    const header = renderHeader();
    const [selectedCity, setSelectedCity] = useState(null);

    return (

        <div className="card">
            <DataTable value={data?.data}
                       filters={filters}
                       header={header}
                       paginator
                       rows={5}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       tableStyle={{minWidth: '50rem'}}
                       paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                       currentPageReportTemplate="{first} to {last} of {totalRecords}"
                       paginatorLeft={paginatorLeft}
                       paginatorRight={paginatorRight}>
                <Column field="name" header="Name" style={{width: '25%'}}></Column>
                <Column field="description" header="Description" style={{width: '25%'}}></Column>
                <Column header="operation" style={{width: '25%'}}></Column>
            </DataTable>
            <Dialog className={"flex"} header="Create" visible={showModal}
                    style={{width: '50vw'}}
                    onHide={() => setShowModal(false)} footer={footerContent}>
                <div className={"flex items-center justify-between p-2"}>
                    <InputText
                        name="name"
                        onChange={(e)=>onChangeData(e.target.value, "name")}
                        className={"w-2/5 "} type="text" placeholder="Name"/>
                    <InputText keyfilter="int"
                               onChange={(e)=>onChangeData(e.target.value, "price")}
                               placeholder="Price"
                               className={'w-2/5'}/>

                </div>
                <div className={"flex items-center justify-between p-2"}>
                    < Dropdown
                        value={selectedCity}
                               onChange={(e) => onChangeData(e.value.id, "brandid")}
                               options={dataBrand?.data} optionLabel="name"
                               placeholder="Brand" className="w-2/5"/>
                    < Dropdown value={dataCategory?.data}
                               onChange={(e) => onChangeData(e.value.id, "categoryid")}
                               options={dataCategory?.data} optionLabel="name"
                               placeholder="Category" className="w-2/5 "/>
                </div>

                <div className={"flex items-center justify-between p-2"}>

                    < Dropdown value={dataDiscount?.data}
                               onChange={(e) => onChangeData(e.value.id, "discountid")}
                               options={dataDiscount?.data} optionLabel="name"
                               placeholder="Discount" className="w-2/5"/>
                    < Dropdown value={material?.data}
                               onChange={(e) => onChangeData(e.value.id, "materialid")}
                               options={material?.data} optionLabel="name"
                               placeholder="Material" className="w-2/5"/>
                </div>

                <div className={"flex items-center justify-between p-2"}>
                </div>
                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea rows={5} cols={30} className=" w-full"
                                   placeholder={"Description"}/>
                </div>
                <Fieldset legend={"Product detail"}>
                    <div className={"flex items-center justify-between p-2"}>

                        < Dropdown value={color?.data}
                                   onChange={(e) => onChangeData(e.value.id,"colorid")}
                                   options={color?.data} optionLabel="name"
                                   placeholder="Color" className="w-2/5"/>
                        <InputText value={dataDiscount?.data} className={"w-2/5"} type="text" placeholder="Name"/>
                    </div>
                    <div className={"flex items-center justify-between p-2"}>
                        < Dropdown value={sizes?.data} onChange={(e) => setSizes(e.value)}
                                   options={sizes?.data} optionLabel="name"
                                   placeholder="Sizes" className="w-2/5"/>
                        <InputText keyfilter="int" placeholder="Quantity" className={'w-2/5'}/>

                    </div>
                </Fieldset>
            </Dialog>
        </div>

    )
}
