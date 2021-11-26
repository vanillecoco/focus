import React ,{useState}  from 'react';
import {Link, useHistory} from "react-router-dom";
import './Admin.css';
import {db,auth, firebaseApp} from "../firebase";



function Admin() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imgURL, setURL] = useState('');
    const history = useHistory();
    let state;

    const write = e => {
        e.preventDefault();

        // const enroll = firebaseApp.database().ref('enroll');
        const product = {
            name,
            price,
            imgURL

        }
        //enroll.push(product);
    }

    // componentDidMount(){
    //     firebaseApp.collection("admin")
    //         .doc("enroll")
    //         .get()
    //         .then(doc => {
    //             this.setState({
    //                 data: doc.data().product_name
    //             })
    //         })
    // }

    // const register = e => {
    //     e.preventDefault();
    //
    //     auth.createUserWithEmailAndPassword(email, password)
    //         .then((auth) => {
    //             if (auth){
    //                 history.push('/')
    //             }
    //         })
    //         .catch(error => alert(error.message))
    // }

    const Write = e => {
            e.preventDefault();


        }

    return (
<div>
        <h1>Admin page</h1>
        <p>Manage product</p>
    <br/>
        <p>new product</p>
        <form className="admin_form">
            <h5>Product </h5>
            <input type='text' value={name} onChange=
                {e => setName(e.target.value)}/>

            <h5> Price </h5>
            <input type='number' value={price} onChange
                ={e => setPrice(e.target.value)}/>

            <h5> Image URL </h5>
            <input type='text' value={imgURL} onChange
                ={e => setURL(e.target.value)}></input>
           <p>OR</p>
            <input type='file' value={imgURL} onChange
                ={e => setURL(e.target.files[0])}></input>

            <br /><br />
            <button type='submit'
                    className='register_btn'
                    onClick={write}> register
            </button>

        </form>

    <div>
        <h1></h1>
    </div>
</div>
    );
}

export default Admin;