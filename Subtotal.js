import React from 'react';
import './Subtotal.css';
import CurrecnyFormat from 'react-currency-format';
import './Subtotal.css';
import {useStateValue} from "../StateProvider";
import {getBasketTotal} from "./reducer";
import {useHistory} from "react-router-dom";

function Subtotal() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();


    return (
        <div className="subtotal">
        <CurrecnyFormat
            renderText={(value) => (
                <>
                    <p>
                        Total ( {basket?.length} items): <strong> {value}  </strong>
                    </p>
                    <small className="subtotal_gift">
                        <input type="checkbox"/>checkbox
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />

            <button onClick={e => history.push('/payment')}>Pay </button>
        </div>
    );
}

export default Subtotal;