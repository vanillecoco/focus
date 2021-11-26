import React from 'react';
import './Product.css'
import {useStateValue} from "../StateProvider";

function Product({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type:"ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });

    };

    return (
        <div className="product">
           <div className="product_info">
               <p>{title}</p>
               <p className="product_price">
                   <small>price</small>
                   <strong>{price}</strong>
                   <small>dollars</small>
               </p>
               <div className="product_rating">
                   {
                       Array(rating)
                           .fill()
                           .map(()=> (
                               <p>★</p>
                           ))
                   }
               </div>
           </div>

            <img src={image} alt=""/>
            <button onClick={addToBasket} className='product_cart_button'>Add to Cart</button>

        </div>
    );
}

export default Product;