import FormProducts from "./FormProducts"
import { useProducts } from "../../hooks/useProducts"
import AdminAside from "../../Nav/AdminAside"
import { useState } from "react"
const NewProduct = () => {
    const { handlerAddProduct } = useProducts();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        description: ''
    });

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handlerAddProduct(product);
    }
    return (
        <div className="flex m-5">
            <div className="w-1/4">
                <AdminAside />
            </div>
            <div className="w-3/4">
                <h1 className="font-bold text-2xl m-10">DATOS DEL PRODUCTO</h1>
                <FormProducts value={product} onChange={onChange} onSubmit={onSubmit} />   
            </div>
        </div>
    )
}

export default NewProduct