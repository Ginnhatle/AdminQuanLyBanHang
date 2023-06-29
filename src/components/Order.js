import React, { useRef } from 'react';
import { useEffect } from "react";
import axios from "axios";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
// import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method

export const Order = () => {
    const [dataOrder, setDataOrder] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [filters, setFilters] = useState(null);

    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const [infoProduct, setInfoProduct] = useState({});
    useEffect(() => {
        gets();
        initFilters();
        setFormData({});
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Get data
    function gets() {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/orders')
            .then(res => setDataOrder(res.data.data))
            .catch(err => { });
    }

    console.log(dataOrder);

    // Update status
    const handleChangeStatus = (id, status) => {
        axios.put(`http://13.54.43.177:3030/mv-core/v1/admin/orders/${id}`, {
            order_status: status
        })
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
    }

    const onChangeData = (value, name) => {
        formData[name] = value;
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        if (value !== "") {
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/orders')
                .then(res => {
                    let dataFilters = res.data.data.filter(el => el.username.toUpperCase().includes(value.toUpperCase()));
                    setDataOrder(dataFilters);
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
            <div></div>
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
            <Button className="mx-2" label="Detail" rowdata={rowData} onClick={() => { setShowModalUpdate(true); setFormData(rowData); }} />
            {nextStatus(rowData.status, rowData)}
        </div>
    };

    const footerContentUpdate = () => {
        return <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => { setShowModalUpdate(false); getDetailProduct() }} className="bg-red-500" />
        </div>
    }

    const getDetailProduct = () => {
        console.log(formData);
        var info = '';
        formData?.order_detail_responses?.forEach(element => {
            console.log(element);
            axios.get(`http://13.54.43.177:3030/mv-core/v1/admin/products/${formData.id}`)
                .then(res => {
                    console.log(res.data.data);
                    let info = '';
                    info += "Name: " + res.data.data.name;
                    info += "\nBrand: " + res.data.data.name_brand;
                    info += "\nCategory: " + res.data.data.name_category;
                    info += "\nPrice Core: " + res.data.data.price_core;
                    info += "\nDiscount: " + res.data.data.discount;
                    return info;
                }).then(el => el)
                .catch(err => { });
        });
        console.log(info);
        return "NULL";
    }

    const nextStatus = (status, data) => {
        if (status === 'PENDING') {
            return <Button label="ACEPT" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "CONFIRMED")} className="bg-green-500" autoFocus />
        } else if (status === 'CONFIRMED') {
            return <>
                <Button label="SHIP" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "SHIPPING")} autoFocus className='bg-green-500' />
                <Button label="PENDING" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "REQUEST_CANCEL")} autoFocus className='bg-green-500' />
                <Button label="CANCEL" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "CANCELED")} autoFocus className='ml-2 bg-red-500' />
            </>
        } else if (status === 'SHIPPING') {
            return <>
                <Button label="DONE" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "COMPLETE")} autoFocus className='bg-green-500' />
                <Button label="PENDING" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "REQUEST_CANCEL")} autoFocus className='bg-green-500' />
                <Button label="CANCEL" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "CANCELED")} autoFocus className='ml-2 bg-red-500' />
            </>
        }
        else if (status === 'REQUEST_CANCEL') {
            return <Button label="ACCEPT CANCEL" icon="pi pi-check" onClick={() => handleChangeStatus(data?.id, "CANCELED")} autoFocus className='bg-green-500' />
        }
    }

    const header = renderHeader();

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={dataOrder}
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
                <Column field="username" header="username" style={{ width: '15%' }}></Column>
                <Column field="address" header="Address" style={{ width: '15%' }}></Column>
                <Column field="total_price" header="Total Price" style={{ width: '15%' }}></Column>
                <Column field="ship_cost" header="Ship Cost" style={{ width: '15%' }}></Column>
                <Column field="note" header="Note" style={{ width: '5%' }}></Column>
                <Column field="status" header="Status" style={{ width: '5%' }}></Column>
                <Column header="operation" body={operation} style={{ width: '25%' }}>

                </Column>
            </DataTable>
            <Dialog className={"flex"} header="Update" visible={showModalUpdate}
                style={{ width: '50vw' }}
                onHide={() => setShowModalUpdate(false)} footer={footerContentUpdate}
            >
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>User Name: </label>
                    <InputText
                        className={"w-[85%] "}
                        type="text"
                        placeholder="User Name"
                        name={"username"}
                        defaultValue={formData.username}
                        onChange={(e) => onChangeData(e.target.value, "username")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>Address: </label>
                    <InputText
                        className={"w-[85%] "}
                        placeholder={"Address"}
                        name={"address"}
                        defaultValue={formData.address}
                        onChange={(e) => onChangeData(e.target.value, "address")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>Total Price: </label>
                    <InputText
                        className={"w-[85%] "}
                        placeholder={"Total Price"}
                        name={"total_price"}
                        defaultValue={formData.total_price}
                        onChange={(e) => onChangeData(e.target.value, "total_price")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>Ship Cost: </label>
                    <InputText
                        className={"w-[85%] "}
                        placeholder={"Ship Cost"}
                        name={"ship_cost"}
                        defaultValue={formData.ship_cost}
                        onChange={(e) => onChangeData(e.target.value, "ship_cost")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>Note: </label>
                    <InputText
                        className={"w-[85%] "}
                        placeholder={"Note"}
                        name={"note"}
                        defaultValue={formData.note}
                        onChange={(e) => onChangeData(e.target.value, "note")}
                    />
                </div>
                <div className={"flex p-2 items-center justify-between"}>
                    <label htmlFor={`username`}>Status: </label>
                    <InputText
                        className={"w-[85%] "}
                        placeholder={"Status"}
                        name={"status"}
                        defaultValue={formData.status}
                        onChange={(e) => onChangeData(e.target.value, "status")}
                    />
                </div>
                <Fieldset legend={"Product Order"}>
                    {
                        formData.order_detail_responses ? formData.order_detail_responses.map((el, index) =>
                            <>
                                <div key={index + 100} className="flex p-4 items-center justify-between">
                                    <span>Name: {el.name}</span>
                                    <span>Brand: {el.name_brand}</span>
                                    <span>Category: {el.name_category}</span>

                                </div>
                                <div key={index + 100} className="flex p-4 items-center justify-between">

                                    <span>Price Core: {el.price_core}</span>
                                    <span>Discount: {el.discount}</span>
                                    <span>Color: {el.color}</span>
                                    <span>Size: {el.size}</span>
                                    <span>Quantity: {el.quantity}</span>
                                </div>
                            </>
                        ) : <>Không có sản phẩm</>
                    }
                </Fieldset>
            </Dialog>
        </div>
    )
}
