import AdminAside from "../../Nav/AdminAside";
import FormProducts from "./FormProducts";
import { useProducts } from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditProduct = () => {
    const params = useParams();
    const productId = params.productId;
    const productDetails = useSelector(state => state.product.productById);
    const { product, handlerGetProductsById, handlerUpdateProduct } = useProducts();
    const [formData, setFormData] = useState({
        name: productDetails?.name || '',
        price: productDetails?.price || '',
        category: productDetails?.category || '',
        image: productDetails?.image || '',
        description: productDetails?.description || '',
    });
    useEffect(() => {
        if (!productDetails || productDetails.id !== parseInt(productId)) {
            handlerGetProductsById(productId);
        }
    }, [productId, productDetails, handlerGetProductsById]);
    
    // Este useEffect se ejecutará cada vez que productDetails cambie.
    useEffect(() => {
        if (productDetails) {
            setFormData({
                name: productDetails.name || '',
                price: productDetails.price || '',
                category: productDetails.category || '',
                image: productDetails.image || '',
                description: productDetails.description || '',
            });
        }
    }, [productDetails]);   

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías la actualización del producto
        handlerUpdateProduct(productId, formData);
    };

    return (
        <div className="flex m-5">
            <div className="w-1/4">
                <AdminAside />
            </div>
            <div className="w-3/4">
                <h1 className="font-bold text-2xl m-10">DATOS DEL PRODUCTO</h1>
                <FormProducts value={formData} onChange={onChange} onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default EditProduct