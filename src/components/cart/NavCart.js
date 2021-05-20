


export const NavCartItem =  (props) => {

    return (
        <div className="product">
            <div className="product-cart-details">
            <h4 className="product-title">
                <a href="/">{props.name}</a>
            </h4>

            <span className="cart-product-info">
                <span className="cart-product-qty">{props.qty}</span>x
                ₹{props.selling_price}
            </span>
            </div>

            <figure className="product-image-container">
            <a href="/" className="product-image">
                <img
                src={props.imageUrl}
                alt="product"
                />
            </a>
            </figure>
            <a
            href="/"
            className="btn-remove"
            title="Remove Product"
            >
            <i className="icon-close"></i>
            </a>
        </div>
    )
}


const NavCart = (props) => {


   


    return (
        <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-cart-products">
                   

                    {
                        props.cart.length ? 
                        props.cart.map((dt)=><NavCartItem {...dt} />)
                        :
                        ''
                    }

                </div>

                    <div className="dropdown-cart-total">
                        <span>Total</span>

                        <span className="cart-total-price">₹160.00</span>
                    </div>

                    <div className="dropdown-cart-action">
                        <a href="cart.html" className="btn btn-primary">
                            View Cart
                        </a>
                        <a
                            href="checkout.html"
                            className="btn btn-outline-primary-2"
                        >
                            <span>Checkout</span>
                            <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
            </div>
    )
}

export default NavCart