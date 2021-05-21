import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Product from "../components/product/Product";
import ProductCard from "../components/product/ProductCard";
import { fetch_products_by_category } from "../components/server/api";


const ProductList = (props) => {

    const urlparamsdata = useParams()

    const [compData,setCompData] = useState({
        products:[]
    })

    const fetch_products_list = async () => {
        // console.log('list props',props);
        // console.log('list urlparamsdata',urlparamsdata);
        await fetch_products_by_category({
            category_id:urlparamsdata.id
        }).then((rs)=>{
            if(rs.status){
                setCompData({
                    products:rs.data
                })
            }
        })
    }

    useEffect(() => {
        if(!compData.products.length){
            fetch_products_list();
            console.log(compData.products);
        }
        
    },[])

    return (
        <main className="main">
            <section className="py-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="osahan-listing">
                            <div className="d-flex align-items-center mb-3">
                                <h4>Pick's Today</h4>
                                <div className="m-0 text-center ml-auto">
                                    <div
                                        // href="/"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        className="btn text-muted bg-white mr-2"
                                        ><i className="icofont-filter mr-1"></i> Filter
                                    </div>
                            
                                    <div
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        className="btn text-muted bg-white"
                                        ><i className="icofont-signal mr-1"></i> Sort
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            {
                                compData.products.length ? 
                                compData.products.map(({id,...otherData})=>{
                                    return <Product column_not_cut={false} key={id} id={id} {...otherData} />
                                })
                                :''
                            }
                            </div>
                            {/* <ProductCard/> */}
                           
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
        
    )

}

export default  ProductList