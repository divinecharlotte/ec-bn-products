import React, { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setProducts } from '../redux/productSlice';

function ProductList() {
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('http://localhost:3000/api/v1/products/public');
        const data = await response.json();
        dispatch(setProducts(data.products));
      }
      fetchData();
    }, [dispatch]);

  console.log("Products:", products);
  return (
    <div>
    {products.map((product) => (
      <div key={product.id}>
        <img src={product.images} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>{product.isAvailable ? 'In Stock' : 'Out of Stock'}</p>
        <p>{product.isExpired ? 'Expired' : 'Not Expired'}</p>
        {product.isAvailable && !product.isExpired && (
            <div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => removeFromCart(product)}>Remove</button>
      </div> )}</div>
    ))}
  </div>
)
}

export default ProductList;