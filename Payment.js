import React, {useEffect, useState} from 'react';
import './Payment.css';
import CheckoutProduct from "./CheckoutProduct";
import {Link, useHistory} from "react-router-dom";
import {useStateValue} from "../StateProvider";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {getBasketTotal} from "./reducer";
import CurrecnyFormat from 'react-currency-format';
import axios from "./axios";
import {db} from "../firebase";

function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);


    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: "/payments/create?total=" + getBasketTotal(basket)
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('client 비밀은 다음과 같아요', clientSecret)



    const handleSubmit = async (event) => {

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment 확인 및 정보

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,

                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능


            dispatch({
                type: 'EMPTY_BASKET'
            })


            history.replace('/orders')

        })

    }


    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


    return (
        <div className='payment'>
            <div className='payment_container'>


                <Link to="/checkout">
                    <h1>
                        Back to cart ({basket?.length} items )
                    </h1>
                </Link>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3> Deliver to </h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>BC</p>
                        <p>Vancouver</p>
                    </div>
                </div>


            <div className='payment_section'>
                <div className='payment_title'>
                    <h3> Review and Order History </h3>
                </div>
                <div className='payment_items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                </div>
            </div>
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment by..</h3>
                </div>
                <div className="payment_details">

                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                            <div className='payment_priceContainer'>
                                <CurrecnyFormat
                                    renderText={(value) => (

                                        <h3> Total : $ {value} </h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing...</p> : "Purchase"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                    </form>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;