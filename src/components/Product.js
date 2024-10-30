import { Link } from 'react-router-dom';

const Product = ({ product }) => (
    <div className="product-card">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
);

export default Product;
