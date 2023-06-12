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
import {useNavigate, useParams} from "react-router-dom";
import {redirect} from "react-router-dom";

export const Brand = () => {
    const [dataBrand, setDataBrand] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: null,
        description: "",
        name: "",
    });
    useEffect(() => {
        axios.get('http://localhost:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => console.log(err))
        initFilters();
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text/>;
    const paginatorRight = <Button type="button" icon="pi pi-download" text/>;
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (userId && id && title && body) {
        axios.post('http://localhost:3030/mv-core/v1/admin/brand/saveOrUpdate', formData)
            .then(res => {

                setDataBrand([...dataBrand, res.data]);
                setFormData({
                    id: null,
                    description: "",
                    name: "",
                });

            })
            .catch(err => console.log(err))

        // }
    };
    const handleUpdate = (e) => {

        // if (userId && id && title && body) {
        axios.post(`http://localhost:3030/mv-core/v1/admin/brand/saveOrUpdate/${id}`, formData)
            .then(res => {
                setDataBrand([...dataBrand, res.data]);
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
    const footerContentUpdate = (rowData) => {
        console.log(rowData,1111111111111111)
        return <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text"/>
        <Button label="Submit" icon="pi pi-check" onClick={event => handleUpdate(rowData.id)} autoFocus/>
    </div>
}

    const onChangeData = (value, name) => {
        let _data = {...formData}

        _data[name] = value
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
    const handleDelete = async (id) => {
        const conf = window.confirm("Do you want to delete")
        if (conf) {
            axios.post('http://localhost:3030/mv-core/v1/admin/brand/delete/' + id)
                .then(res => {
                }).catch(err => console.log(err))
            // navigate("/home/brand");
        }
    }
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
    const operation = (rowData) => {
        return <div>
            <Button label="Delete" severity="danger" onClick={event => handleDelete(rowData.id)} autoFocus/>

            <Button label="Update" rowData={rowData} onClick={() => setShowModalUpdate(true)}/>
        </div>
    };
    const header = renderHeader();

    return (

        <div className="card">
            <DataTable value={dataBrand?.data}
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
                <Column header="operation" body={operation} style={{width: '25%'}}>

                </Column>
            </DataTable>
            <Dialog className={"flex"} header="Create" visible={showModal}
                    style={{width: '50vw'}}
                    onHide={() => setShowModal(false)} footer={footerContent}>

                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                               type="text"
                               placeholder="Name"
                               onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea rows={5} cols={30}
                                   className=" w-full"
                                   onChange={(e) => onChangeData(e.target.value, "description")}
                                   placeholder={"Description"}/>
                </div>
            </Dialog>
            <Dialog className={"flex"} header="Update" visible={showModalUpdate}
                    style={{width: '50vw'}}
                    onHide={() => setShowModalUpdate(false)} footer={footerContentUpdate}>

                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                               type="text"
                               placeholder="Name"
                               name={"name"}
                               value={dataBrand?.name}
                               onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea rows={5} cols={30}
                                   className=" w-full"
                                   onChange={(e) => onChangeData(e.target.value, "description")}
                                   placeholder={"Description"}/>
                </div>
            </Dialog>
        </div>

    )
}
