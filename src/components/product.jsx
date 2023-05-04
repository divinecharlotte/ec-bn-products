import React, { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setProducts } from '../redux/productSlice';
import classes from './products.module.css'
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
    <div className={classes.container}>
    {products.map((product) => (
      <div className={classes.card} key={product.id}>
        <img className={classes.image} src={product.images} alt={product.name} />
        <h3 className='text-xl text-blue-500'>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>{product.isAvailable ? 'In Stock' : 'Out of Stock'}</p>
        <p>{product.isExpired ? 'Expired' : 'Not Expired'}</p>
        {product.isAvailable && !product.isExpired && (
            <div>
              <button  className={classes.buttons} onClick={() => addToCart(product)}>Add to Cart</button>
              <button className={classes.buttons}  onClick={() => removeFromCart(product)}>Remove</button>
      </div> )}</div>
    ))}
  </div>
)
}

export default ProductList;