import { useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method

export const Account = () => {
    const [dataAccount, setDataAccount] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [filters, setFilters] = useState(null);

    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        gets();
        initFilters();
        setFormData({});
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Get data
    function gets() {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/accounts')
            .then(res => setDataAccount(res.data.data))
            .catch(err => { });
        console.log(dataAccount);
    }

    // Add new brand
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.id = null;
        axios.post('http://13.54.43.177:3030/mv-core/v1/admin/accounts/saveOrUpdate', formData)
            .then(res => {
                if (res.status === 200) {
                    if (res.status === 200) {
                        toast.current.show({
                            severity: 'success',
                            summary: 'Success Message',
                            detail: 'Thêm thành công',
                        });
                        gets();
                    }
                }
            })
            .catch(err => { });
        setShowModal(false);
        setFormData({});
    };

    // Update brand
    const handleUpdate = (e) => {
        axios.post(`http://13.54.43.177:3030/mv-core/v1/admin/accounts/saveOrUpdate`, formData)
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
        setFormData({});
    };


    // Confirm delete
    const confirmDelete = async (id) => {
        confirmDialog({
            message: 'Bạn chắc chắn muốn xóa ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                axios.delete('http://13.54.43.177:3030/mv-core/v1/admin/accounts/delete/' + id)
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
        });
    };

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );


    const onChangeData = (value, name) => {
        formData[name] = value;
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        if (value !== "") {
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/accounts')
                .then(res => {
                    let dataFilters = res.data.data.filter(el => el.name.toUpperCase().includes(value.toUpperCase()));
                    setDataAccount(dataFilters);
                })
                .catch(err => { });
            console.log(dataAccount);
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
    const operation = (rowData) => {

        return <div>
            <Button className="mx-2" label="Delete" severity="danger" onClick={event => confirmDelete(rowData.id)} autoFocus />
            <Button className="mx-2" label="Update" rowdata={rowData} onClick={() => { setShowModalUpdate(true); setFormData(rowData); }} />
        </div>
    };

    const footerContentUpdate = () => {
        return <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModalUpdate(false)} className="p-button-text" />
            <Button label="Submit" icon="pi pi-check" onClick={(rowdata) => handleUpdate(rowdata?.id)} autoFocus />
        </div>
    }
    const header = renderHeader();

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={dataAccount}
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
                <Column field="name" header="Name" style={{ width: '15%' }}></Column>
                <Column field="phone" header="Phone" style={{ width: '15%' }}></Column>
                <Column field="email" header="Email" style={{ width: '15%' }}></Column>
                <Column field="role" header="Role" style={{ width: '15%' }}></Column>
                <Column field="status" header="Status" style={{ width: '15%' }}></Column>
                <Column header="operation" body={operation} style={{ width: '25%' }}>

                </Column>
            </DataTable>
            <Dialog className={"flex"} header="Create" visible={showModal}
                style={{ width: '50vw' }}
                onHide={() => setShowModal(false)} footer={footerContent}>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >User Name: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="User Name"
                        onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Pass Word: </label>
                    <InputText className={"w-[85%] "}
                        type="password"
                        placeholder="PassWord"
                        onChange={(e) => onChangeData(e.target.value, "password")}
                    />
                </div>

                <div className={"flex p-2 items-center justify-between"}>
                    <label >Phene: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Phone"
                        onChange={(e) => onChangeData(e.target.value, "phone")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Email: </label>
                    <InputText className={"w-[85%] "}
                        type="email"
                        placeholder="Email"
                        onChange={(e) => onChangeData(e.target.value, "email")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Role: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Role"
                        onChange={(e) => onChangeData(e.target.value, "role")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Status: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Status"
                        onChange={(e) => onChangeData(e.target.value, "status")}
                    />
                </div>
            </Dialog>
            <Dialog className={"flex"} header="Update" visible={showModalUpdate}
                style={{ width: '50vw' }}
                onHide={() => setShowModalUpdate(false)} footer={footerContentUpdate}
            >
            <div className={"flex p-2 items-center justify-between"}>
                <label >User Name: </label>
                <InputText className={"w-[85%] "}
                    type="text"
                    placeholder="User Name"
                    name={"name"}
                    defaultValue={formData.name}
                    onChange={(e) => onChangeData(e.target.value, "name")}
                />
            </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Phone: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Phone"
                        name={"phone"}
                        defaultValue={formData.phone}
                        onChange={(e) => onChangeData(e.target.value, "phone")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Email: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Email"
                        name={"email"}
                        defaultValue={formData.email}
                        onChange={(e) => onChangeData(e.target.value, "email")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Role: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Name"
                        name={"role"}
                        defaultValue={formData.role}
                        onChange={(e) => onChangeData(e.target.value, "role")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label >Status: </label>
                    <InputText className={"w-[85%] "}
                        type="text"
                        placeholder="Status"
                        name={"status"}
                        defaultValue={formData.status}
                        onChange={(e) => onChangeData(e.target.value, "status")}
                    />
                </div>
            </Dialog>
        </div>
    )
}
