import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import ProductDetails from '../components/product/ProductDetails';
import { fetch_product_details } from '../components/server/api';
import Footer from '../components/footer/Footer';
import { useParams } from 'react-router-dom';
import SpinLoader from '../components/loader/SpinLoader';

const ProductInfo = () => {
    const [productdata,setProductData]= useState({})
    const [canMove,setCanMove] = useState(0);
    const [params,setParamData]= useState(null)
    const paramss = useParams()
    const fetch_product_data = async () => {
        const { id } = paramss;
        await fetch_product_details({
            id:id
        }).then((rs)=>{
            if(rs.status){
                setCanMove(1)
                setProductData(rs.data)
                setParamData(params)
            }
        })
    }

    useEffect(() => {
        if(params){
            if(paramss.id != params.id){
                fetch_product_data();
            }
        }else{
            fetch_product_data();
        }
        // return () => {
        // }
    }, [params,paramss])

    return (
        !canMove ? <SpinLoader />  :
                    <main>
                        <ProductDetails {...productdata} />
                    </main>
    )

}
export default withRouter(ProductInfo);