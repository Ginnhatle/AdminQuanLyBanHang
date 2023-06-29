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

export const Brand = () => {
    const [dataBrand, setDataBrand] = useState([]);
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
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data.data))
            .catch(err => { });
    }

    // Add new brand
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.id = null;
        axios.post('http://13.54.43.177:3030/mv-core/v1/admin/brand/saveOrUpdate', formData)
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
        console.log(formData);
        axios.post(`http://13.54.43.177:3030/mv-core/v1/admin/brand/saveOrUpdate`, formData)
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
                axios.post('http://13.54.43.177:3030/mv-core/v1/admin/brand/delete/' + id)
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
        if(value !== ""){
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/brand')
            .then(res => {
               let dataFilters = res.data.data.filter(el => el.name.toUpperCase().includes(value.toUpperCase()));
               setDataBrand(dataFilters);
            })
            .catch(err => { });
            console.log(dataBrand);
        }
        else{
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
            <DataTable value={dataBrand}
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
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="description" header="Description" style={{ width: '25%' }}></Column>
                <Column header="operation" body={operation} style={{ width: '25%' }}>

                </Column>
            </DataTable>
            <Dialog className={"flex"} header="Create" visible={showModal}
                style={{ width: '50vw' }}
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
                        placeholder={"Description"} />
                </div>
            </Dialog>
            <Dialog className={"flex"} header="Update" visible={showModalUpdate}
                style={{ width: '50vw' }}
                onHide={() => setShowModalUpdate(false)} footer={footerContentUpdate}
            >
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Name"
                        name={"name"}
                        defaultValue={formData.name}
                        onChange={(e) => onChangeData(e.target.value, "name")}
                    />
                </div>
                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea rows={5} cols={30}
                        className=" w-full"
                        name={"description"}
                        defaultValue={formData.description}
                        onChange={(e) => onChangeData(e.target.value, "description")}
                        placeholder={"Description"} />
                </div>
            </Dialog>
        </div>

    )
}
