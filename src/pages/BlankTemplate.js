import { Link } from "react-router-dom"
import image1 from '../libs/images/page-header-bg.jpg'
import image2 from '../libs/images/video/bg-2.jpg'
import image3 from '../libs/images/video/poster-2.jpg'
import image4 from '../libs/images/about/about-2/signature.png'
import image5 from '../libs/images/about/img-1.jpg'
import Footer from "../components/footer/Footer"
import FooterSupport from "../components/footer/FooterSupport"
import likeimg from '../libs/images/like.svg'
const BlankTemplate = (props) => {

    return (
        <main className="main">
            <div className="page-header text-center" style={{
                backgroundImage:`url(${image1})`
            }} >
                <div className="container">
                    {
                        props.title == 'Wishlist'
                        ?
                        <div class="like">
                            <img src={likeimg} alt="like" />
                        </div>
                        :''
                    }
                    
                    <h1 className="page-title">{props.title}</h1>
                </div>
            </div>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
               
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                    </ol>
                </div>
            </nav>

            {props.component}
            <FooterSupport />
        </main>
    )
}

export default BlankTemplate;