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
import { Calendar } from 'primereact/calendar';
import { InputNumber } from "primereact/inputnumber";


export const Discount = () => {
    const [discount, setDiscount] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toast = useRef(null);
    const [formData, setFormData] = useState({});
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        gets();
        initFilters();
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Get all
    function gets() {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/discount')
            .then(res => setDiscount(res.data.data))
            .catch(err => { });
        console.log(discount);
    }
    // Add new
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.id = null;
        axios.post('http://13.54.43.177:3030/mv-core/v1/admin/discount/saveOrUpdate', formData)
            .then(res => {
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
        axios.post(`http://13.54.43.177:3030/mv-core/v1/admin/discount/saveOrUpdate`,formData)
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
                axios.delete('http://13.54.43.177:3030/mv-core/v1/admin/discount/delete/' + id)
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
        if(value !== ""){
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/discount')
            .then(res => {
               let dataFilters = res.data.data.filter(el => el.name.toUpperCase().includes(value.toUpperCase()));
               setDiscount(dataFilters);
            })
            .catch(err => { });
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
    const header = renderHeader();

    const convertTime = (time) => {
        console.log(time);
        var date = new Date(time);
        var formattedDate = date.toISOString();
        console.log(formattedDate); // Output: 2023-06-26T17:00:00+07:00

        return formattedDate;
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={discount}
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
                <Column field="description" header="Description" style={{ width: '15%' }}></Column>
                <Column field="discount" header="Discount" style={{ width: '15%' }}></Column>
                <Column field="start_date" header="Start date" style={{ width: '15%' }}></Column>
                <Column field="end_date" header="End date" style={{ width: '5%' }}></Column>
                <Column field="status" header="Status" style={{ width: '15%' }}></Column>
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
                <label >Description: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Description"
                        onChange={(e) => onChangeData(e.target.value, "description")}
                    />
                </div>
                <label >Discount: </label>
                <div className={"flex p-2"}>
                    <InputNumber className={"w-full "}
                        placeholder="Discount"
                        onChange={(e) => onChangeData(e.target.value, "discount")}
                        min={1}
                    />
                </div>
                <label >Start date: </label>
                <div className={"flex p-2"}>
                    <Calendar className={"w-full "}
                        placeholder="Shoulder Width"
                        onChange={(e) => onChangeData(convertTime(e.target.value), "start_date")}
                    />
                </div>
                <label >End date: </label>
                <div className={"flex p-2"}>
                    <Calendar className={"w-full "}
                        placeholder="End date"
                        onChange={(e) => onChangeData(convertTime(e.target.value), "end_date")}
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
                <label >Description: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Description"
                        defaultValue={formData.description}
                        onChange={(e) => onChangeData(e.target.value, "description")}
                    />
                </div>
                <label >Discount: </label>
                <div className={"flex p-2"}>
                    <InputNumber className={"w-full "}
                        value={formData.discount}
                        placeholder="Discount"
                        onChange={(e) => onChangeData(e.value, "discount")}
                        min={1}
                    />
                </div>
                <label >Start date: </label>
                <div className={"flex p-2"}>
                    <Calendar className={"w-full "}
                        placeholder="Start date"
                        value={formData.start_date}
                        onChange={(e) => onChangeData(convertTime(e.target.value), "start_date")}
                    />
                </div>
                <label >End date: </label>
                <div className={"flex p-2"}>
                    <Calendar className={"w-full "}
                        placeholder="End date"
                        value={formData.endate}
                        onChange={(e) => onChangeData(convertTime(e.target.value), "end_date")}
                    />
                </div>
                <label >Status: </label>
                <div className={"flex p-2"}>
                    <InputText className={"w-full "}
                        type="text"
                        placeholder="Status"
                        defaultValue={formData.status}
                        onChange={(e) => onChangeData(e.target.value, "status")}
                    />
                </div>
            </Dialog>
        </div>

    )
}
