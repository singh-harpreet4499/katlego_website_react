import OwlCarousel from "react-owl-carousel";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from "react";
import { get_testimonials } from "../server/api";


const options = {
    loop: true,
    navText:["<i class='icon-angle-left adjust_icon' ></i>","<i class='icon-angle-right adjust_icon' ></i>"],
    nav: false, 
    dots: true,
    items:1,
    "margin": 20,
    "responsive": {
        "1200": {
            "nav": true,
           
        }
    }
}

const TestimonialItem = (props) => {
    const {description,name,imageUrl} = props

    return (
        <blockquote className="testimonial text-center">
            <img src={imageUrl} alt="user" />
            <p className="han">“ {description} ”</p>
            <cite>
                {name}
                <span>Customer</span>
                <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={{width:'100%'}}></div>
                    </div>
                </div>
            </cite>

        </blockquote>
    )
}
const Testimonial = (props) => {

    const [testimonials,setTestimonial] = useState([])

    const get_testimonials_data = async () => {
        get_testimonials({})
        .then((rs)=>{
            if(rs.status){
                setTestimonial(rs.data)
            }
        })
    }

    useEffect(() => {
        get_testimonials_data();
       
    }, [])

    return (
        <>
        {
            testimonials.length ?
            (
                <div className="about-testimonials bg-light-2 pt-6 pb-6">
                    <div className="container">
                        <h2 className="title text-center mb-3">Our Customers Say</h2>
                        {/* <div className="owl-carousel owl-simple owl-testimonials-photo" > */}
                        <OwlCarousel
                            className="owl-carousel owl-simple owl-testimonials-photo"
                            { ...options}
                            >
                                {
                                    testimonials.length ? 
                                    testimonials.map((dt)=><TestimonialItem  {...dt} />)

                                    :''
                                }
                            {/* <TestimonialItem /> */}
                        {/* </div> */}
                        </OwlCarousel>
                    </div>
                </div>
            )
            :''
        }
        
        </>
    )
}

export default Testimonial;