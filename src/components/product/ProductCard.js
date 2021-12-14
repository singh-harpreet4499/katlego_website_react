import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../libs/images/demos/demo-2/products/product-5-1.jpg';
import { connect, useSelector, useDispatch } from 'react-redux'
import {add_cart, remove_cart_item,get_cart_items} from '../server/api'
import { updatecarts } from '../../redux/cart/cart.action';
import discounticon from '../../libs/images/discounticon.png'
import './productcard.css';
import LazyImage from '../image/LazyImage';
import HoverImage from 'react-hover-image/build';
// const ProductCard = async (props) => {
//   const [formData, updateFormData] = useState({
//     qty: 1,
//   });
//   const { name, imageUrl, mrp, discount, selling_price, hifen_name, id } =props;

//   const updateCartQty = async (logic) => {
//     var old_qty = parseInt(formData.qty);
//     var new_qty = old_qty;
//     if (logic === "plus") {
//       new_qty = old_qty + 1;
//     } else if (logic === "minus") {
//       new_qty = old_qty - 1;
//       if (new_qty < 0) {
//         new_qty = 0;
//       }
//     }
//     updateFormData({
//       qty: new_qty,
//     });
//   };

//   const handleChange = (e) => {
//     e.preventDefault();
//     updateCartQty(e.target.name);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="col-6 col-md-3 mb-3">
//       <div
//         className="
//                           list-card
//                           bg-white
//                           h-100
//                           rounded
//                           overflow-hidden
//                           position-relative
//                           shadow-sm
//                         "
//       >
//         <div className="list-card-image">
//           <a href="product_details.html" className="text-dark">
//             <div className="member-plan position-absolute">
//               <span className="badge m-3 badge-danger">10%</span>
//             </div>
//             <div className="p-3">
//               <img
//                 src={imageUrl}
//                 className="img-fluid item-img w-100 mb-3"
//                 alt=""
//               />
//               <h6>{name}</h6>
//               <div className="d-flex align-items-center">
//                 <h6 className="price m-0 text-success">
//                   {parseFloat(mrp) > parseFloat(selling_price) ? (
//                     <div>
//                       <strike className="pri">₹{mrp}</strike>₹{selling_price}{" "}
//                       <br />
//                       <span className="off">({discount} % off)</span>
//                     </div>
//                   ) : (
//                     <div>₹{selling_price}</div>
//                   )}
//                 </h6>
//                 <div className="ml-auto">
//                   <form
//                     id="myform"
//                     onSubmit={handleSubmit}
//                     className="cart-items-number d-flex"
//                     method="POST"
//                   >
//                     <input
//                       type="button"
//                       name="minus"
//                       onClick={handleChange}
//                       value="-"
//                       className="qtyminus btn btn-success btn-sm"
//                     />
//                     <input
//                       type="text"
//                       name="qty"
//                       onClick={handleChange}
//                       value={formData.qty}
//                       className="qty form-control"
//                     />
//                     <input
//                       type="button"
//                       name="plus"
//                       onClick={handleChange}
//                       value="+"
//                       className="qtyplus btn btn-success btn-sm"
//                     />
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };


const ProductCard = (props) => {

  const {name,imageUrl,mrp,discount,selling_price,unit,hifen_name,net_wt,gross_wt,id,is_cart,cartdata,no_of_pieces,hoverimageUrl,stock}=props
  const dispatch = useDispatch();

  const user = useSelector(state=>state.user.currentUser);

  const [compData,setCompData] = useState({
      qty:0
  })

  const handleSubmit =async (e) => {
      e.preventDefault()
  };

  const updateCartQty = async (logic) => {
      var old_qty =parseInt(compData.qty);
      var new_qty=old_qty;
      if(logic==='plus'){

          new_qty = old_qty+1;
      }else if(logic==='minus'){
          new_qty = old_qty-1;
          if(new_qty<0){new_qty=0;}
      }
      const reqdata = {
          product_id:id,
          qty:new_qty
      }
        if(new_qty > stock){
            alert('Out of stock!')
        }else{
            await  add_cart(reqdata)
    
            await get_cart_items().then((rs)=>{
                if(rs.status){
                    dispatch(updatecarts(rs))
                }
            })
    
            setCompData({
                qty:new_qty
            })
        }
      
  }


  const handleChange = (e) => {
      e.preventDefault();
      updateCartQty(e.target.name)
  };

  useEffect(() => {
      if(props.is_cart){
          setCompData({
              qty:props.cartdata.qty
          })
      }else{
          setCompData({
              qty:0
          })
      }
      // console.log('ppppp',props);

  }, [props])

  return (
      <div className="col-6 col-md-4 mb-3">
          <div className="list-card bac-grey h-100 rounded overflow-hidden position-relative shadow-sm">
              <div className="list-card-image">
                  <Link className="text-dark"
                       to={{
                        pathname: "/product-details/"+hifen_name+"/"+(id),
                    }}
                  >
                      <div className="member-plan position-absolute">
                          <div className="pro-dis ">
                          {/* discounticon */}
                              {
                                discount ? <><span className="discount_centered">{discount}%</span></> : ''
                              }
                          </div>
                      </div>
                      <div className="p-3">
                      <Link
                                            to={{
                                                pathname: "/product-details/"+hifen_name+"/"+(id),
                                            }}>
                          {/* <LazyImage src={imageUrl} alt="" className="img-fluid item-img w-100 mb-2" /> */}
                          <HoverImage
                                src={imageUrl?imageUrl:defaultImage}
                                className="img-fluid item-img w-100 mb-2" 
                                hoverSrc={hoverimageUrl}
                                alt={name}
                            />
                          <h6 className="text-success curr">{name}</h6>
                          </Link>
                          <ul className="anti hidden-xs hidden-sm">
                              <div className="row">
                                  <div className="col-md-6">
                                      <li className="ch-lis">100% Antibiotics Free</li>
                                      <li className="ch-lis">Own Premium Produce</li>
                                  </div>

                                  <div className="col-md-6">
                                      <li className="ch-lis">Fed with our Own Food</li>
                                      <li className="ch-lis">Vacuum Packed</li>
                                  </div>
                              </div>
                          </ul>
                          <div className="align-items-center mt-1">
                              <div className="row">
                                  <div className="col-md-4 pri-lin">
                                  {
                                      !selling_price ? '' :
                                      (mrp>selling_price ? (
                                          <>
                                         <h6 className="price m-0 text-success chi-pri">₹{selling_price}/{unit}</h6><strike className="pri"> MRP₹{mrp}/{unit}</strike>
                                          </>
                                      )
                                      : 
                                      (<h6 className="price m-0 text-success chi-pri">₹{selling_price}/{unit}</h6>))
                                  }
                                      
                                  </div>
                                  <div className="col-md-4">
                                      <p className="piec">Pieces: {no_of_pieces} <br />Net Wt: {net_wt} gms</p>
                                  </div>
                                  <div className="col-md-4">
                                  {
                                      !selling_price || stock == 0 ? 
                                      <button style={{cursor:'not-allowed'}} name="plus" value="1" onClick={()=>alert('Sorry! This Product is Out of stock')} className="btn cart-btn" disabled={true}>
                                            Out Of Stock
                                        </button>
                                      :
                                    (parseInt(compData.qty) ?
                                    <div className="m-auto">
                                        <form
                                        id="myform"
                                        onSubmit={handleSubmit}
                                        className="cart-items-number d-flex"
                                        method="POST"
                                        >
                                        <input
                                            type="button"
                                            name="minus"
                                            onClick={handleChange}
                                            value="-"
                                            className="qtyminus btn btn-success btn-sm"
                                            readOnly
                                        />
                                        <input
                                            type="text"
                                            name="qty"
                                            onClick={handleChange}
                                            value={compData.qty}
                                            className="qty form-control"
                                            readOnly
                                        />
                                        <input
                                            type="button"
                                            name="plus"
                                            onClick={handleChange}
                                            value="+"
                                            className="qtyplus btn btn-success btn-sm"
                                            readOnly
                                        />
                                        </form>
                                    </div>
                                    :
                                    <button name="plus" value="1" onClick={handleChange} className="btn cart-btn">
                                        add to cart
                                    </button>)
                                  }
                                 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default connect()(ProductCard);