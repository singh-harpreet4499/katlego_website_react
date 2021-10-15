import defaulimg1 from '../../libs/images/video/poster-1.jpg'
import defaulimg2 from '../../libs/images/kat.png'
import defaulimg3 from '../../libs/images/deliv.png'
import { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'
import ReadMoreReact from 'read-more-react';

const PromiseSection = (props) => {

    const app_data = useSelector(state=>state.app_data)

    return (
            <div className="row"  aria-labelledby="nav-homepage-tabs-01-032020-tab">
                <div className="tab-pane-carousel col-12 col-md-6 col-lg-6 px-0">

                    <div className="home__tabs__image lazy loaded" data-bg="" data-ll-status="loaded" style={{backgroundImage:`url(${defaulimg2})`}}>
                    </div>
                </div>

                <div className="home__tabs__body col-12 col-md-6 col-lg-6 text-center text-md-left">
                    <div className="home__tabs__title">Katlego Promise</div>
                    <div className="home__tabs__description py-3">
                        <p className="abo-para">{parse(app_data.promise)}</p>
                    </div>
                </div>
            </div>
    )
}

const AboutusSection = (props) => {
    const app_data = useSelector(state=>state.app_data)
    return (
                <div className="tab-pane fade row active show" aria-labelledby="nav-homepage-tabs-02-032020-tab">
                    <div className="tab-pane-carousel col-12 col-md-6 col-lg-6 px-0">
                        <div className="video-poster">
                            <img src={defaulimg1} alt="poster" />

                            <div className="video-poster-content">
                                <a href="https://www.youtube.com/watch?v=W0UYKgfQi9k" className="btn-video btn-iframe"><i className="icon-play"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="home__tabs__body col-12 col-md-6 col-lg-6 text-center text-md-left">
                        <div className="home__tabs__title">About Us</div>
                        <div className="home__tabs__description py-3">
                            <p className="abo-para">{parse(app_data.about_us)}</p>
                        </div>
                    </div>
                </div>
    )
}


const DeliverySection = (props) => {
    const app_data = useSelector(state=>state.app_data)
    return (
        <div className="row"  aria-labelledby="nav-homepage-tabs-03-032020-tab">
                    <div className="tab-pane-carousel col-12 col-md-6 col-lg-6 px-0">

                        <div className="home__tabs__image lazy loaded"  style={{backgroundImage:`url(${defaulimg3})`}}>
                        </div>
                    </div>

                    <div className="home__tabs__body col-12 col-md-6 col-lg-6 text-center text-md-left">
                        <div className="home__tabs__title">Delivery</div>
                        <div className="home__tabs__description py-3">
                            <p className="abo-para">{parse(app_data.delivery_policy)}</p>
                        </div>

                    </div>
                </div>
    )
}

const Aboutus = (props) => {

    const [pageName,setPageName] = useState('aboutussection');

    const [page,setPage] = useState(<AboutusSection />)

    const update_page_name =  (page_name='my_account') => {
        // localStorage.setItem('about_section',page_name)
        setPageName(page_name)
        switch (page_name) {
            case 'aboutussection':
                setPage(<AboutusSection />)
                break;
            case 'promisesection':
                setPage(<PromiseSection />)
                break;
    
            case 'deliverysection':
                setPage(<DeliverySection />)
                break;
        
            default:
                setPage(<AboutusSection />)

                break;
        }
    }
    useEffect(() => {

        const dashboard_page = localStorage.getItem('about_section');
        if(dashboard_page){
            setPageName(dashboard_page)
        }

    }, [])

    return (
        <div className="container">
        <hr className="mt-2 mb-3" />
        <div className="home__tabs">
            <div className="row">
                <div className="col-12 col-md-9 col-lg-6 d-flex align-items-center what-we">
                </div>

                <nav className="col-12 col-md-3 col-lg-6 pt-3 px-md-0">
                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">

                        <div className="nav-item nav-link" onClick={()=>update_page_name('aboutussection')} id="nav-homepage-tabs-02-032020-tab" data-toggle="tab" style={{cursor:"pointer"}} role="tab" aria-controls="nav-homepage-tabs-02-032020" aria-selected="true" data-carousel-selector=".tab-pane-carousel">
                            About Us
                            <div className="tab__border"></div>
                        </div>

                        <div className="nav-item nav-link" id="nav-homepage-tabs-01-032020-tab" onClick={()=>update_page_name('promisesection')} data-toggle="tab" role="tab" style={{cursor:"pointer"}}  aria-controls="nav-homepage-tabs-01-032020" aria-selected="false" data-carousel-selector=".tab-pane-carousel">
                            Katlego Promise
                            <div className="tab__border"></div>
                        </div>

                        <div className="nav-item nav-link" id="nav-homepage-tabs-03-032020-tab" onClick={()=>update_page_name('deliverysection')} data-toggle="tab" role="tab" style={{cursor:"pointer"}}  aria-controls="nav-homepage-tabs-03-032020" aria-selected="false" data-carousel-selector=".tab-pane-carousel">
                            Delivery
                            <div className="tab__border"></div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="tab-content col-12 px-0 py-3" id="nav-tabContent">

                {page}
            </div>

                {/* <Tabs >
                    <TabList>
                        <Tab>About Us</Tab>
                        <Tab>Katlego Promise</Tab>
                        <Tab>Delivery</Tab>
                    </TabList>
                    <TabPanel>
                        <AboutusSection />
                    </TabPanel>
                    <TabPanel>
                        <PromiseSection />
                    </TabPanel>
                    <TabPanel>
                        <DeliverySection />
                    </TabPanel>
                </Tabs> */}
        </div>
    </div>

    )
}

export default Aboutus