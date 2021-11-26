import React from 'react';
import './Home.css'
import Product from "./Product";


function Home() {
    return (
        <div className="home">

            <div className="home_container">
                <img className="home_image"
                     src="https://cdn.pixabay.com/photo/2018/10/04/16/15/honey-3723944_960_720.jpg" alt=""/>

                <div className="home_row">
                    <Product id="2323"
                             title="item1"
                             price={11}
                             image="https://cdn.pixabay.com/photo/2020/04/14/18/13/honey-5043708_960_720.jpg"
                             rating={5}/>
                    <Product
                        id="2320" title="item2"
                        price={50}
                        image="https://cdn.pixabay.com/photo/2014/05/23/18/15/honey-352205_960_720.jpg"
                        rating={3}/>


                </div>
                <div className="home_row">

                    <Product
                        id="2321" title="item3"
                        price={50}
                        image="https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_960_720.jpg"
                        rating={3}/>
                    <Product
                        id="2322" title="item4"
                        price={100}
                        image="https://cdn.pixabay.com/photo/2018/02/25/07/15/food-3179853_960_720.jpg"
                        rating={3}/>
                </div>
                <div className="home_row">
                    <Product
                        id="2324" title="item5"
                        price={2425}
                        image="https://cdn.pixabay.com/photo/2017/09/14/14/33/cupcake-2749204_960_720.jpg"
                        rating={3}/>
                </div>

            </div>
        </div>
    );
}

export default Home;