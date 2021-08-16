import { useSelector } from "react-redux";


const SuccessOrder = (props) => {
    const user = useSelector(state=>state.user.currentUser);
    

    // const {}
    return (

        <main class="main">
            <div class="d-flex justify-content-center" style={{backgroundColor:'#eb2627'}}>
                <div class="col-md-6">
                    <div class="p-5 text-center">
                        <i class="icofont-check-circled display-1 text-warning"></i>
                        <h1 class="text-white font-weight-bold">{user ? user.name : 'User'}, Your order has been successful 🎉</h1>
                        <p class="text-white">Check your order status in <a href="/" class="font-weight-bold text-decoration-none text-white">My Order</a> about next steps information.</p>
                    </div>

                    <div class="bg-white rounded p-3 m-5 text-center">
                        <h6 class="font-weight-bold mb-2">Preparing your order</h6>
                        <p class="small text-muted">Your order will be prepared and will come soon</p>
                        <a href="/" class="btn rounded btn-warning btn-lg btn-block gre">Track My Order</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SuccessOrder