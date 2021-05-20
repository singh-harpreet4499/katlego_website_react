import React from 'react';
import Dealday from '../components/app/Dealday';
import { Heading } from '../components/app/Heading';
import Newsletter from '../components/app/Newsletter';
import Category2 from '../components/category/Category2';
import ExperienceRow from '../components/experience/ExperienceRow';
import Footer from '../components/footer/Footer';
import FooterSupport from '../components/footer/FooterSupport';
import Header from '../components/header/Header';
import Adds from '../components/offers/Adds';
import Product from '../components/product/Product';
import ProductSlider from '../components/product/ProductSlider';
import HomeSlider from '../components/slider/HomeSlider';
import {fetch_homepage_web} from '../components/server/api'
import Location from '../components/location/Location';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            categories:[],
            best_sellers:[],
            combos:[]
        }
    }

    loadEssentialdata = async () => {
        // if(this.props.user_login){
            
        // }
        await fetch_homepage_web({}).then((response)=>{
            if(response.status){
                this.setState({
                    categories:response.categories,
                    best_sellers:response.best_sellers,
                    combos:response.combos
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
            <>
                <Header categories={categories}/>
                {/* <Location /> */}
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
                                        ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <Adds />
    
                <Heading title="Combos product" />
                <ProductSlider products={combos} />
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
            <FooterSupport />
    
            <Newsletter />
            <Footer/>
            </>
        );
    }
    
    

}

export default Home