import { useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Fieldset } from "primereact/fieldset";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Image } from 'primereact/image';
import { v4 as uuidv4 } from 'uuid';
import { cloudName, apiKey, apiSecret } from '../utilities/cloudinaryConfig'; // Import your Cloudinary configuration
// import { Upload } from 'primereact/upload';


export const Product = () => {
    const toast = useRef(null);
    const uploadRef = useRef(null);

    const [productUpdate, setProductUpdate] = useState(null);

    // index selected to modifie
    const [indexDetailSelect, setIndexDetailSelect] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    // product details
    const [productDetails, setProductDetails] = useState([]);
    const [productDetailRequests, setProductDetailRequests] = useState([]);
    const [data, setData] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [material, setMaterial] = useState([]);
    const [color, setColor] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);

    const [brandSelected, setBrandSelected] = useState({});
    const [categorySelected, setCategorySelected] = useState({});
    const [discountSelected, setDiscountSelected] = useState({});
    const [materialSelected, setMateriaSelected] = useState({});

    const [filters, setFilters] = useState(null);

    const icon = (<i className="pi pi-check"></i>)


    useEffect(() => {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => { })
        initFilters();
    }, [])
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const [formData, setFormData] = useState({
        brand_id: 0,
        category_id: 0,
        description: "",
        discount_id: 0,
        material_id: 0,
        name: "",
        price: 0,
        product_detail_requests: []
    });

    useEffect(() => {
        getProducts();
    }, [])

    function getProducts() {
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/products/')
            .then(res => setData(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/brand')
            .then(res => setDataBrand(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/sizes')
            .then(res => setSizes(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/categories')
            .then(res => setDataCategory(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/discount')
            .then(res => setDataDiscount(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/material')
            .then(res => setMaterial(res.data))
            .catch(err => { });
        axios.get('http://13.54.43.177:3030/mv-core/v1/admin/colors')
            .then(res => setColor(res.data))
            .catch(err => { });
    }


    useEffect(() => {
        if (productUpdate === null || dataBrand.length === 0 || dataCategory.length === 0 || dataDiscount.length === 0 || material.length === 0) {
            return;
        }
        if (productUpdate) {
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/products/' + productUpdate.id)
                .then(res => {
                    setProductDetailRequests([]);
                    setProductDetails([]);
                    let details = [];
                    let requests = [];
                    res.data.data.product_details.forEach(element => {
                        requests = [...requests, {
                            size_id: element.size_id,
                            color_id: element.color_id,
                            images: element.images.map(el => el.source),
                            quantity: element.quantity
                        }]
                        details = [...details, {
                            size_id: sizes?.data?.find(el => el.id === element.size_id),
                            color_id: color?.data?.find(el => el.id === element.color_id),
                            images: element.images.map(el => el.source),
                            quantity: element.quantity
                        }]
                    });

                    setProductDetails(details);
                    setProductDetailRequests(requests);
                    setFormData({ ...res.data.data })
                    setTimeout(() => {
                        let brand = dataBrand?.data?.find(el => el.id === res.data.data.brand_id);
                        setBrandSelected(brand);
                        let category = dataCategory?.data?.find(el => el.id === res.data.data.category_id);
                        setCategorySelected(category);
                        let discount = dataDiscount?.data?.find(el => el.id === res.data.data.discount_id);
                        setDiscountSelected(discount);
                        let mater = material?.data?.find(el => el.id === res.data.data.material_id);
                        setMateriaSelected(mater);
                    }, 100)
                })
                .catch(err => { });
        }


    }, [productUpdate])



    // Add new
    const handleSubmit = () => {
        formData.product_detail_requests = productDetailRequests;
        axios.post('http://13.54.43.177:3030/mv-core/v1/admin/products/create/', formData)
            .then(res => {
                if (res.status === 200) {
                    getProducts();
                    setShowModal(false);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: 'Thêm mới thành công',
                    });
                    setProductDetailRequests([]);
                    setProductDetails([]);
                    setBrandSelected({});
                    setCategorySelected({});
                    setDiscountSelected({});
                    setMateriaSelected({});
                    setFormData({
                        brand_id: 0,
                        category_id: 0,
                        description: "",
                        discount_id: 0,
                        material_id: 0,
                        name: "",
                        price: 0,
                        product_detail_requests: []
                    });
                }
            })
            .catch(err => { });
    };

    // Update
    const handleUpdate = () => {
        console.log(formData);
        formData.product_detail_requests = productDetailRequests;
        console.log(productDetailRequests.length)
        axios.put('http://13.54.43.177:3030/mv-core/v1/admin/products/update/' + formData.id, formData)
            .then(res => {
                if (res.status === 200) {
                    getProducts();
                    setShowModal(false);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success Message',
                        detail: 'Cập nhật thành công',
                    });
                    setProductDetailRequests([]);
                    setProductDetails([]);
                    setBrandSelected({});
                    setCategorySelected({});
                    setDiscountSelected({});
                    setMateriaSelected({});
                    setFormData({
                        brand_id: 0,
                        category_id: 0,
                        description: "",
                        discount_id: 0,
                        material_id: 0,
                        name: "",
                        price: 0,
                        product_detail_requests: []
                    });
                    setShowModalUpdate(false);
                }
            })
            .catch(err => { })
    }

    // Delete
    // Confirm delete
    const handleDelete = async (id) => {
        confirmDialog({
            message: 'Bạn chắc chắn muốn xóa ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                axios.delete('http://13.54.43.177:3030/mv-core/v1/admin/products/delete/' + id)
                    .then(res => {
                        if (res.status === 200) {
                            toast.current.show({
                                severity: 'success',
                                summary: 'Success Message',
                                detail: 'Xóa thành công',
                            });
                            getProducts();
                        }
                        // return navigate('/home');
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


    // Upload image
    const handleCustomUpload = async (event) => {
        const files = event.files;

        const formData = new FormData();
        for (let file of files) {
            formData.append('file', file);
            formData.append('upload_preset', 'g1q93tvz'); // Specify your Cloudinary upload preset
            formData.append('public_id', `products/${uuidv4()}`); // Generate a unique identifier for the uploaded file
        }

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                auth: {
                    username: apiKey,
                    password: apiSecret
                }
            });

            // Check if upload was successful
            if (response.status === 200 && response.data.public_id) {
                const secureUrl = response.data.public_id;
                let details = [...productDetails];
                details[indexDetailSelect]?.images.push(secureUrl);
                const request = [...productDetailRequests];
                request[indexDetailSelect]?.images.push(secureUrl);
                setProductDetails([...details]);
                setProductDetailRequests([...request]);
            } else {
                console.error('Upload failed:', response);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }

        uploadRef.current.clear(); // Reset the upload component after successful upload
    };

    const onChangeData = (value, name, type) => {
        console.log(value);
        if (type === 0) {
            formData[name] = value;
        } else {
            formData.product_detail_requests[0][name] = value;
        }

    }
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        if (value !== "") {
            axios.get('http://13.54.43.177:3030/mv-core/v1/admin/products/')
                .then(res => {
                    let dataFilters = res.data.data.filter(el => el.name.toUpperCase().includes(value.toUpperCase()));
                    setData({ data: dataFilters });
                    console.log(dataFilters);
                })
                .catch(err => { });
        }
        else {
            getProducts();
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

    // Handle product detail
    const handleInputChange = (index, name, value) => {
        const details = [...productDetails];
        details[index][name] = value;
        const request = [...productDetailRequests];
        if (name === 'quantity') {
            request[index][name] = value;
        } else {
            request[index][name] = value.id;
        }
        setProductDetails([...details]);
        setProductDetailRequests([...request]);
    };
    // add new
    const addProductDetail = () => {
        setProductDetails([...productDetails, {
            color_id: color?.data[0], size_id: sizes?.data[0], quantity: 0, images: []
        }]);
        setProductDetailRequests([...productDetailRequests, {
            color_id: color?.data[0].id, size_id: sizes?.data[0].id, quantity: 0, images: []
        }])
    };

    const removeProductDetail = (index) => {
        const details = [...productDetails];
        details.splice(index, 1);
        setProductDetails(details);
        const resquest = [...productDetailRequests];
        resquest.splice(index, 1);
        setProductDetailRequests(resquest);
        console.log(productDetailRequests.length)
        console.log(resquest.length)
    };

    const removeImageProductDetail = (indexProduct, index) => {
        const details = [...productDetails];
        const request = [...productDetailRequests];
        details[indexProduct].images.splice(index, 1);
        request[indexProduct].images.splice(index, 1);
        setProductDetails([...details]);
        setProductDetailRequests([...request]);
    }

    const header = renderHeader();
    const operation = (rowData) => {
        return <div>
            <Button className="mx-2" label="Delete" severity="danger" onClick={event => handleDelete(rowData?.id)} autoFocus />
            <Button className="mx-2" label="Update" rowdata={rowData} onClick={() => { setShowModalUpdate(true); setProductUpdate(rowData); }} />
        </div>
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={data?.data}
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
                <Column header="operation" body={operation} style={{ width: '25%' }}></Column>
            </DataTable>
            <Dialog
                className={"flex"}
                header="CREATE"
                visible={showModal}
                style={{ width: '50vw' }}
                onHide={() => setShowModal(false)}>
                <div className={"flex items-center justify-between p-2"}>
                    {/* Name */}
                    <InputText
                        name="name"
                        required={true}
                        onChange={(e) => onChangeData(e.target.value, "name", 0)}
                        className={"w-2/5 "} type="text" placeholder="Name" />
                    {/* Price */}
                    <InputNumber
                        inputId="currency-vietname"
                        mode="currency"
                        currency="VND"
                        locale="vn-VN"
                        keyfilter="int"
                        onChange={(e) => onChangeData(e.value, "price", 0)}
                        placeholder="Price"
                        className={'w-2/5'}
                        min={0} />

                </div>

                <div className={"flex items-center justify-between p-2"}>
                    {/* Brand */}
                    < Dropdown
                        value={brandSelected}
                        onChange={(e) => { onChangeData(e.value.id, "brand_id", 0); setBrandSelected(e.value) }}
                        options={dataBrand?.data}
                        optionLabel="name"
                        placeholder="Brand" className="w-2/5" />
                    {/* Categories */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "category_id", 0); setCategorySelected(e.value) }}
                        value={categorySelected}
                        options={dataCategory?.data}
                        optionLabel="name"
                        placeholder="Category" className="w-2/5 " />
                </div>

                <div className={"flex items-center justify-between p-2"}>
                    {/* Discount */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "discount_id", 0); setDiscountSelected(e.value) }}
                        value={discountSelected}
                        options={dataDiscount?.data} optionLabel="name"
                        placeholder="Discount" className="w-2/5" />
                    {/* Material */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "material_id", 0); setMateriaSelected(e.value) }}
                        value={materialSelected}
                        options={material?.data} optionLabel="name"
                        placeholder="Material" className="w-2/5" />
                </div>

                <div className={"flex items-center justify-between p-2"}>
                </div>

                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea rows={5} cols={30} className=" w-full"
                        onChange={(e) => onChangeData(e.target.value, 'description', 0)}
                        placeholder={"Description"} />
                </div>
                <Fieldset legend={"Product detail"}>
                    {productDetails.length > 0 ? productDetails.map((detail, index) => (
                        <div key={index} onClick={() => setIndexDetailSelect(index)}>
                            <div className="p-grid py-1">
                                <h3><b>{`Sản phẩm chi tiết: ${index + 1}`}</b></h3>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`color-${index}`}>Color: </label>
                                    < Dropdown
                                        name="color_id"
                                        id={`color-${index}`}
                                        option={color?.data}
                                        options={color?.data}
                                        optionLabel="name"
                                        value={detail.color_id}
                                        onChange={(e) => handleInputChange(index, 'color_id', e.value)}
                                        placeholder="Colors" className="w-4/5" />
                                </div>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`size-${index}`}>Size: </label>
                                    < Dropdown
                                        name="size_id"
                                        id={`size-${index}`}
                                        options={sizes?.data}
                                        optionLabel="name"
                                        value={detail?.size_id}
                                        onChange={(e) => handleInputChange(index, 'size_id', e.value)}
                                        placeholder="Sizes" className="w-4/5" />
                                </div>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`quantity-${index}`}>Quantity: </label>
                                    <InputNumber
                                        inputId="currency-vietname"
                                        mode="currency"
                                        currency="VND"
                                        locale="vn-VN"
                                        keyfilter="int"
                                        id={`quantity-${index}`}
                                        name="quantity"
                                        value={detail.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', e.value)} />
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-text p-button-danger delete-button"
                                    />
                                </div>
                                <Button className="inline-block mx-4" type="button" label="Remove" onClick={() => removeProductDetail(index)} />
                            </div>    <div>
                                <h3>Upload Files</h3>
                                <FileUpload
                                    ref={uploadRef}
                                    customUpload
                                    uploadHandler={handleCustomUpload}
                                    accept=".jpg"
                                    maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-0">Drag and drop files to upload</p>}
                                    chooseOptionsLabel="Select Files"
                                    chooseLabel="Browse"
                                    className="p-d-inline-block"
                                />
                                <div className="card flex justify-content-center">
                                    {
                                        detail?.images?.map((el, indexImage) =>
                                            <div style={{ position: 'relative' }}>
                                                <Image src={`https://res.cloudinary.com/dyljpkvgg/image/upload/v1687368077/${el}.jpg`} indicatorIcon={icon} alt="Image" preview width="250" className="inline-block z-0" />
                                                <i key={indexImage} onClick={() => removeImageProductDetail(index, indexImage)} className="pi pi-times z-10" style={{ fontSize: '1rem', position: 'absolute', top: '0', right: '0' }}></i>
                                            </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    )) : <>{"Thêm sản phẩm chi tiết"}</>}
                    <Button key={1} className="my-5" type="button" label="Add Detail" onClick={() => addProductDetail()} />
                </Fieldset>
                <Fieldset >
                    <Button className="mb-5 float-right" label="Submit" icon="pi pi-check" onClick={() => { handleSubmit() }} autoFocus />
                    <Button className="mx-5 float-right bg-red-400" label="Cancel" icon="pi" autoFocus onClick={() => setShowModal(false)} />
                </Fieldset>
            </Dialog>
            <Dialog
                className={"flex"}
                header="UPDATE"
                visible={showModalUpdate}
                style={{ width: '50vw' }}
                onHide={() => { setShowModalUpdate(false); }}>
                <div className={"flex items-center justify-between p-2"}>
                    {/* Name */}
                    <InputText
                        name="name"
                        required={true}
                        defaultValue={productUpdate?.name}
                        onChange={(e) => onChangeData(e.target.value, "name", 0)}
                        className={"w-2/5 "} type="text" placeholder="Name" />
                    {/* Price */}
                    <InputNumber
                        value={productUpdate?.price}
                        inputId="currency-vietname"
                        mode="currency"
                        currency="VND"
                        locale="vn-VN"
                        keyfilter="int"
                        onChange={(e) => onChangeData(e.value, "price", 0)}
                        placeholder="Price"
                        className={'w-2/5'}
                        min={0} />

                </div>

                <div className={"flex items-center justify-between p-2"}>
                    {/* Brand */}
                    < Dropdown
                        value={brandSelected}
                        onChange={(e) => { onChangeData(e.value.id, "brand_id", 0); setBrandSelected(e.value) }}
                        options={dataBrand?.data}
                        optionLabel="name"
                        placeholder="Brand" className="w-2/5" />
                    {/* Categories */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "category_id", 0); setCategorySelected(e.value) }}
                        value={categorySelected}
                        options={dataCategory?.data} 
                        optionLabel="name"
                        placeholder="Category" className="w-2/5 " />
                </div>

                <div className={"flex items-center justify-between p-2"}>
                    {/* Discount */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "discount_id", 0); setDiscountSelected(e.value) }}
                        value={discountSelected}
                        options={dataDiscount?.data} 
                        optionLabel="name"
                        placeholder="Discount" className="w-2/5" />
                    {/* Material */}
                    < Dropdown
                        onChange={(e) => { onChangeData(e.value.id, "material_id", 0); setMateriaSelected(e.value) }}
                        value={materialSelected}
                        options={material?.data} 
                        optionLabel="name"
                        placeholder="Material" className="w-2/5" />
                </div>

                <div className={"flex items-center justify-between p-2"}>
                </div>

                <div className={"flex items-center justify-between p-2"}>
                    <InputTextarea
                        rows={5}
                        cols={30}
                        className=" w-full"
                        defaultValue={productUpdate?.description}
                        onChange={(e) => onChangeData(e.target.value, 'description', 0)}
                        placeholder={"Description"} />
                </div>
                <Fieldset legend={"Product detail"}>
                    {productDetails.length > 0 ? productDetails.map((detail, index) => (
                        <div key={index} onClick={() => setIndexDetailSelect(index)}>
                            <div className="p-grid py-1">
                                <h3><b>{`Sản phẩm chi tiết: ${index + 1}`}</b></h3>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`color-${index}`}>Color: </label>
                                    < Dropdown
                                        name="color_id"
                                        id={`color-${index}`}
                                        option={color?.data}
                                        options={color?.data}
                                        optionLabel="name"
                                        value={detail.color_id}
                                        onChange={(e) => handleInputChange(index, 'color_id', e.value)}
                                        placeholder="Colors" className="w-4/5" />
                                </div>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`size-${index}`}>Size: </label>
                                    < Dropdown
                                        name="size_id"
                                        id={`size-${index}`}
                                        onChange={(e) => handleInputChange(index, 'size_id', e.value)}
                                        value={detail?.size_id}
                                        options={sizes?.data}
                                        optionLabel="name"
                                        placeholder="Sizes" className="w-4/5" />
                                </div>
                                <div className="inline-block p-col-4">
                                    <label htmlFor={`quantity-${index}`}>Quantity: </label>
                                    <InputNumber
                                    id={`quantity-${index}`} 
                                    name="quantity" 
                                    value={detail.quantity} 
                                    onChange={(e) => handleInputChange(index, 'quantity', e.value)} 
                                    keyfilter="int"
                                    placeholder="Price"
                                    className={'w-2/5'}
                                    min={1}/>
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-text p-button-danger delete-button"
                                    />
                                </div>
                                <Button className="inline-block mx-4" type="button" label="Remove" onClick={() => removeProductDetail(index)} />
                            </div>    <div>
                                <h3>Upload Files</h3>
                                <FileUpload
                                    ref={uploadRef}
                                    customUpload
                                    uploadHandler={handleCustomUpload}
                                    accept=".jpg"
                                    maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-0">Drag and drop files to upload</p>}
                                    chooseOptionsLabel="Select Files"
                                    chooseLabel="Browse"
                                    className="p-d-inline-block"
                                />
                                <div className="card flex justify-content-center">
                                    {
                                        detail?.images?.map((el, indexImage) =>
                                            <div style={{ position: 'relative' }}>
                                                <Image src={`https://res.cloudinary.com/dyljpkvgg/image/upload/v1687368077/${el}.jpg`} indicatorIcon={icon} alt="Image" preview width="250" className="inline-block z-0" />
                                                <i key={indexImage} onClick={() => removeImageProductDetail(index, indexImage)} className="pi pi-times z-10" style={{ fontSize: '1rem', position: 'absolute', top: '0', right: '0' }}></i>
                                            </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    )) : <>{"Thêm sản phẩm chi tiết"}</>}
                    <Button key={1} className="my-5" type="button" label="Add Detail" onClick={() => addProductDetail()} />
                </Fieldset>
                <Fieldset >
                    <Button className="mb-5 float-right" label="Submit" icon="pi pi-check" onClick={() => handleUpdate()} autoFocus />
                    <Button className="mx-5 float-right bg-red-400" label="Cancel" icon="pi" autoFocus onClick={() => setShowModalUpdate(false)} />
                </Fieldset>
            </Dialog>

        </div>
    )
}
