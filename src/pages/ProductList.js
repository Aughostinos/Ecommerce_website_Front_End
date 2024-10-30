import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import Product from '../Product';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <div className="product-list">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
