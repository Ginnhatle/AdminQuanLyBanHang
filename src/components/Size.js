import { useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method


export const Size = () => {
    const [size, setSize] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toast = useRef(null);
    const [filters, setFilters] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        gets();
        initFilters();
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Get all
    function gets() {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/sizes')
            .then(res => setSize(res.data.data))
            .catch(err => { });
        console.log(size);
    }
    // Add new
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.id = null;
        console.log(formData);
        axios.post('http://13.54.43.177:3030/mv-core/v1/admin/sizes/create', formData)
            .then(res => {
                setSize([...size, res.data.data]);
                setFormData({});
                setShowModal(false);
                if (res.status === 200) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: 'Thêm thành công',
                    });
                    gets();
                }
            })
            .catch(err => { })
    };

    // Update
    const handleUpdate = (e) => {
        console.log(formData);
        axios.put(`http://13.54.43.177:3030/mv-core/v1/admin/sizes/update/${formData.id}`, formData)
            .then(res => {
                if (res.status === 200) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: 'Cập nhật thành công',
                    });
                    gets();
                }
            })
            .catch(err => { })
        setShowModalUpdate(false);
    };

    // Delete
    // Confirm delete
    const confirmDelete = async (id) => {
        confirmDialog({
            message: 'Bạn chắc chắn muốn xóa ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                axios.delete('http://13.54.43.177:3030/mv-core/v1/admin/sizes/delete/' + id)
                    .then(res => {
                        if (res.status === 200) {
                            toast.current.show({
                                severity: 'success',
                                summary: 'Success Message',
                                detail: 'Xóa thành công',
                            });
                            gets();
                        }
                    }).catch(err => {
                        toast.current.show({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: 'Xóa không thành công',
                        });
                    });
            },
            reject: () => {
                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            }
        });
    };

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    const footerContentUpdate = () => {
        return <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModalUpdate(false)} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={(rowdata) => handleUpdate(rowdata?.id)} autoFocus />
        </div>
    }

    const operation = (rowData) => {
        return <div>
            <Button className="mx-2" label="Delete" severity="danger" onClick={event => confirmDelete(rowData?.id)} autoFocus />
            <Button className="mx-2" label="Update" rowdata={rowData} onClick={() => { setShowModalUpdate(true); setFormData(rowData); }} />
        </div>
    };


    const onChangeData = (value, name) => {
        formData[name] = value;
        setFormData(formData);
        console.log(formData);
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        if (value !== "") {
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/color')
                .then(res => {
                    let dataFilters = res.data.data.filter(el => el.name.toUpperCase().includes(value.toUpperCase()));
                    setSize(dataFilters);
                })
                .catch(err => { });
        }
        else {
            gets();
        }
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

        });
    };

    const renderHeader = () => {
        return (<div className="flex items-center justify-between">
            <Button type="button" icon="pi pi-filter-slash" label="Add" outlined
                onClick={() => setShowModal(true)}
            />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    onChange={onGlobalFilterChange}
                    placeholder="Keyword Search" />
            </span>
        </div>);
    };
    const header = renderHeader();

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={size}
                filters={filters}
                header={header}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}>
                <Column field="name" header="Name" style={{ width: '5%' }}></Column>
                <Column field="long_shirt" header="Long Shirt" style={{ width: '15%' }}></Column>
                <Column field="shoulder_width" header="Shoulder Width" style={{ width: '15%' }}></Column>
                <Column field="chest" header="Chest" style={{ width: '5%' }}></Column>
                <Column field="wide_neck" header="Wide Neck" style={{ width: '15%' }}></Column>
                <Column field="long_sleeve" header="Long Sleeve" style={{ width: '15%' }}></Column>
                <Column header="operation" body={operation} style={{ width: '25%' }}></Column>
                <Column style={{ width: '25%' }}>
                    <Button type="button" color="red" icon="pi pi-filter-slash" label="Add" outlined />
                </Column>
            </DataTable>
            <Dialog className={"flex"} header="Create" visible={showModal}
                style={{ width: '50vw' }}
                onHide={() => setShowModal(false)} footer={footerContent}>
                <label >Name: </label>
                <div className={"flex p-2"}>

                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <label >Long Shirt: </label>
                <div className={"flex p-2"}>

                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Long Shirt"
                        onChange={(e) => onChangeData(e.target.value, "long_shirt")}
                    />
                </div>
                <label >Long Sleeve: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Long Sleeve"
                        onChange={(e) => onChangeData(e.target.value, "long_sleeve")}
                    />
                </div>
                <label >Shoulder Width: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Shoulder Width"
                        onChange={(e) => onChangeData(e.target.value, "shoulder_width")}
                    />
                </div>
                <label >Wide Neck: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Wide Neck"
                        onChange={(e) => onChangeData(e.target.value, "wide_neck")}
                    />
                </div>
                <label >Chest: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Chest"
                        onChange={(e) => onChangeData(e.target.value, "chest")}
                    />
                </div>
            </Dialog>
            <Dialog className={"flex"} header="Update" visible={showModalUpdate}
                style={{ width: '50vw' }}
                onHide={() => setShowModalUpdate(false)} footer={footerContentUpdate}
            >
                <label >Name: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Name"
                        defaultValue={formData.name}
                        onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <label >Long Shirt: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Long Shirt"
                        defaultValue={formData.long_shirt}
                        onChange={(e) => onChangeData(e.target.value, "long_shirt")}
                    />
                </div>
                <label >Long Sleeve: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Long Sleeve"
                        defaultValue={formData.long_sleeve}
                        onChange={(e) => onChangeData(e.target.value, "long_sleeve")}
                    />
                </div>
                <label >Shoulder Width: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Shoulder Width"
                        defaultValue={formData.shoulder_width}
                        onChange={(e) => onChangeData(e.target.value, "shoulder_width")}
                    />
                </div>
                <label >Wide Neck: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Wide Neck"
                        defaultValue={formData.wide_neck}
                        onChange={(e) => onChangeData(e.target.value, "wide_neck")}
                    />
                </div>
                <label >Chest: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="number"
                        placeholder="Chest"
                        defaultValue={formData.chest}
                        onChange={(e) => onChangeData(e.target.value, "wide_neck")}
                    />
                </div>
            </Dialog>
        </div>

    )
}
