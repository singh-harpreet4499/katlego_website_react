import React from 'react';
import Dealday from '../components/app/Dealday';
import { Heading } from '../components/app/Heading';
import Category2 from '../components/category/Category2';
import ExperienceRow from '../components/experience/ExperienceRow';
import FooterSupport from '../components/footer/FooterSupport';
import Header from '../components/header/Header';
import Adds from '../components/offers/Adds';
import Product from '../components/product/Product';
import ProductSlider from '../components/product/ProductSlider';
import HomeSlider from '../components/slider/HomeSlider';
import {fetch_homepage_web} from '../components/server/api'
import Aboutus from '../components/app/Aboutus';
import Ourrecipe from '../components/app/Ourecipe';
import SpinLoader from '../components/loader/SpinLoader';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            categories:[],
            best_sellers:[],
            combos:[],
            canMove:0
        }
    }

    loadEssentialdata = async () => {
        console.log('loadEssentialdata');
        await fetch_homepage_web({}).then((response)=>{
            console.log('happy',response);
            if(response.status){
                
                this.setState({
                    categories:response.categories,
                    best_sellers:response.best_sellers,
                    combos:response.combos,
                    canMove:1
                })
            }
        })
    }

    

    componentDidMount(){
        this.loadEssentialdata();
    }

    render() {
        const {best_sellers,categories,combos}=this.state
        return (
            <div >
                <Header canMove={this.state.canMove} categories={categories}/>
                <HomeSlider />
                <ExperienceRow />
                <div className="container">
                    <Heading title="best sellers" horizontalLine={false} />
    
                    <div className="tab-content">
                        <div
                        className="tab-pane p-0 fade show active"
                        id="top-all-tab"
                        role="tabpanel"
                        aria-labelledby="top-all-link"
                        >
                            <div className="products">
                                <div className="row justify-content-center">
                                    {
                                        best_sellers.length ? (
                                            best_sellers.map(({id,...otherData})=><Product id={id} key={id} {...otherData} />)
                                        ) : <SpinLoader />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <Adds />
    
                <Heading  title="Combos product" />
                {
                    this.state.canMove ?  <ProductSlider products={combos} /> : <SpinLoader />
                }
                
                <Dealday />

    
                <Heading title="Explore by categories" horizontalLine={false} />
                <div className="container">
                    <div className="row justify-content-center">
                        <Category2 defaultImage={1}/>
                        <Category2 defaultImage={2}/>
                        <Category2 defaultImage={3}/>
                        <Category2 defaultImage={4}/>
                        <Category2 defaultImage={5}/>
                        <Category2 defaultImage={6}/>
                    </div>
                </div>
                <Aboutus />


                {
                    combos.length?
                    <div
                    >
                        <Heading title="OUR HOT-SELLING PRODUCTS" />
                        <div className="container">
                            <div className="row">
                        {combos.map(({id,...otherdata})=><Product id={id} key={id}  {...otherdata} />)}
                        </div>
                        </div>
                    </div>
                    :''
                }
                <Ourrecipe />
            <FooterSupport />
    
            </div>
        );
    }
    
    

}

export default Home