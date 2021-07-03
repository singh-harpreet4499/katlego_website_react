import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { fetch_products_by_category } from "../components/server/api";

import SpinLoader from '../components/loader/SpinLoader';
import FooterSupport from "../components/footer/FooterSupport";

const ProductList = (props) => {

    const urlparamsdata = useParams()

    const [compData,setCompData] = useState({
        products:[]
    })
    const [canMove,setCanMove] = useState(0);

    const fetch_products_list = async () => {
        // console.log('urlparamsdata',urlparamsdata);
        // debugger;
        await fetch_products_by_category({
            category_id:urlparamsdata.id
        }).then((rs)=>{
            if(rs.status){
                setCompData({
                    products:rs.data
                })
            }
            setCanMove(1);
        })
    }

    useEffect(() => {
        if(!compData.products.length){
            fetch_products_list();
            console.log(compData.products);
        }
        
    },[])

    if(canMove===0){
        return (
            <SpinLoader />
        );
    }else{
        return (
            <main >
                <section className="py-4 osahan-main-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="osahan-listing">
                                <div className="d-flex align-items-center mb-3">
                                    <h4>{urlparamsdata.categoryName}</h4>
                                    <div className="m-0 text-center ml-auto">
                                        <div
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
                                        return <ProductCard column_not_cut={false} key={id} id={id} {...otherData} />
                                    })
                                    :''
                                }
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    <FooterSupport />
                </section>
            </main>
            
        )
    }

  

}

export default  ProductList