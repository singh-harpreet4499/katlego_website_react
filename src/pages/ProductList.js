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

    const [filter_show,showFilter] = useState(0)

    const [canMove,setCanMove] = useState(0);

    const toggleFilterModal = () => showFilter(!filter_show)

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

                    <div class={`modal fade right-modal ${filter_show?'show':''}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                                        <button type="button" class="close" data-dismiss="modal" onClick={toggleFilterModal} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body p-0">
                                        <div class="osahan-filter">
                                            <div class="filter">
                                                <div class="p-3 bg-light border-bottom">
                                                    <h6 class="m-0">SORT BY</h6>
                                                </div>
                                                <div class="custom-control border-bottom px-0  custom-radio">
                                                    <input type="radio" id="customRadio1" name="location" class="custom-control-input" checked />
                                                    <label class="custom-control-label py-3 w-100 px-3" for="customRadio1">Top Rated</label>
                                                </div>
                                                <div class="custom-control border-bottom px-0  custom-radio">
                                                    <input type="radio" id="customRadio2" name="location" class="custom-control-input" />
                                                    <label class="custom-control-label py-3 w-100 px-3" for="customRadio2">Nearest Me</label>
                                                </div>
                                                <div class="custom-control border-bottom px-0  custom-radio">
                                                    <input type="radio" id="customRadio3" name="location" class="custom-control-input" />
                                                    <label class="custom-control-label py-3 w-100 px-3" for="customRadio3">Cost High to Low</label>
                                                </div>
                                                <div class="custom-control border-bottom px-0  custom-radio">
                                                    <input type="radio" id="customRadio4" name="location" class="custom-control-input" />
                                                    <label class="custom-control-label py-3 w-100 px-3" for="customRadio4">Cost Low to High</label>
                                                </div>
                                                <div class="custom-control border-bottom px-0  custom-radio">
                                                    <input type="radio" id="customRadio5" name="location" class="custom-control-input" />
                                                    <label class="custom-control-label py-3 w-100 px-3" for="customRadio5">Most Popular</label>
                                                </div>
                                                <div class="p-3 bg-light border-bottom">
                                                    <h6 class="m-0">ADDITIONAL FILTERS</h6>
                                                </div>
                                                <div class="px-3 pt-3">
                                                    <input type="range" class="custom-range" min="0" max="100" name="" />
                                                    <div class="form-row">
                                                        <div class="form-group col-6">
                                                        <label>Min</label>
                                                        <input class="form-control" placeholder="₹0" type="number" />
                                                    </div>
                                                    <div class="form-group text-right col-6">
                                                        <label>Max</label>
                                                        <input class="form-control" placeholder="₹1,0000" type="number" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer p-0 border-0">
                                        <div class="col-6 m-0 p-0">
                                            <button type="button" class="btn border-top btn-lg btn-block" onClick={toggleFilterModal}  data-dismiss="modal">Close</button>
                                        </div>
                                        <div class="col-6 m-0 p-0">
                                            <button type="button" class="btn btn-success btn-lg btn-block sche">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                <section className="py-4 osahan-main-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="osahan-listing">
                                <div className="d-flex align-items-center mb-3">
                                    <h4>{urlparamsdata.categoryName}</h4>
                                    <div className="m-0 text-center ml-auto">
                                        <div
                                        onClick={toggleFilterModal}
                                           style={{cursor:"pointer"}}
                                            className="btn text-muted bg-white mr-2"
                                            ><i className="icofont-filter mr-1"></i> Filter {'&'} Sort
                                        </div>
                                        {/* <div
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            className="btn text-muted bg-white"
                                            ><i className="icofont-signal mr-1"></i> Sort
                                        </div> */}
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