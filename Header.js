import React from 'react';
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link, useHistory} from 'react-router-dom';
import {useStateValue} from "../StateProvider";
import {auth} from "../firebase";

function Header() {

    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
            history.push('/');
        }

    }

    return (
        <div className="header">
            <Link to="/">
            <img className="header_logo" src="https://cdn.pixabay.com/photo/2017/06/10/12/46/bee-2389834_1280.png" />
            </Link>
                <div className="header_search">
                    <input className="header_searchInput" type="text" />
                    <SearchIcon className="header_searchIcon"/>

                </div>

                <div className="header_nav">
                    <div className="header_option">
                        <span className="header_optionLineOne">{!user ? 'Guest' : user.email}</span>
                        <Link to={!user && '/login'} className="homelogin">
                        <span onClick={handleAuthentication} className="header_optionLineTwo">{user ? 'LOGOUT' : 'LOGIN'}</span>
                        </Link>
                    </div>

                    <div className="header_option">
                        <span className="header_optionLineOne">BACK</span>
                        <span className="header_optionLineTwo">LIST</span>
                    </div>

                    <div className="header_option">
                        <span className="header_optionLineOne">WELCOME</span>


                        <span className="header_optionLineTwo">TO BEES</span>
                    </div>

                    <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwoheader_basketCount">{basket?.length}</span>
                    </div>
                    </Link>

                </div>

        </div>
    );
}

export default Header;