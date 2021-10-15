

// import React from 'react';
import defaultimg1 from '../../libs/images/brands/1.png'
import defaultimg2 from '../../libs/images/brands/2.png'
import OwlCarousel from 'react-owl-carousel';
import { useEffect, useState } from 'react';
import { fetch_press_release } from '../server/api';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const Pressrelease = (props) => {

  const [pressrelease,setPressRelease] = useState([])
    
const options1 = {
    nav: false,
    dots: false,
   
    margin: 30,
    loop: true,
    responsive: {
      0: {
        items: 2,
      },
      420: {
        items: 3,
      },
    
      600: {
        items: 4,
      },
      900: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
}


  const set_press_release = () => {
    fetch_press_release()
    .then((rs)=>{
      console.log(rs);
      if(rs.status){
        setPressRelease(rs.data)
      }
    })
  }


    
  useEffect(() => {
    set_press_release()
        
  }, [])

    if(pressrelease.length){
      return <></>
    }else{


      return  (
            <div className="container">
                    <div className="mt-2 mb-3"> </div>
                    <h2 className="title text-center story">Press Releases</h2>
                    <OwlCarousel className='owl-carousel mt-3 mb-3 owl-simple owl-loaded owl-drag' {...options1} >
                    <div class="owl-stage-outer"><div class="owl-stage" >
                      {/* {
                        pressrelease.length ? 
                        pressrelease.map((dt)=>{

                          return (
                            <div className="owl-item " style={{width:'169.667px',marginRight:'30px'}} ><div className="brand">
                            <img src={dt.imageUrl} alt="Brand Name" />
                        </div></div>
                          )

                        })

                        :''
                      } */}
                        <div className="owl-item " style={{width:'169.667px',marginRight:'30px'}} ><div className="brand">
                            <img src={defaultimg1} alt="Brand Name" />
                        </div></div>

                        <div className="owl-item " style={{width:'169.667px',marginRight:'30px'}} ><div className="brand">
                            <img src={defaultimg2} alt="Brand Name" />
                        </div></div>

                      </div>
                      </div>
                    </OwlCarousel>
            </div>
        )
    }
    
}

export default Pressrelease;