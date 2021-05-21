import React from 'react'
import { withRouter } from 'react-router';
import ProductDetails from '../components/product/ProductDetails';
import { fetch_product_details } from '../components/server/api';
import Footer from '../components/footer/Footer';

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            productdata:{}
        }
    }
    
    fetch_product_data = async () => {
        console.log(this.props.match.params);
        const { id,productName} = this.props.match.params;
        await fetch_product_details({
            id:id
        }).then((rs)=>{
            console.log('product_details',rs);
            if(rs.status){
                this.setState({
                    productdata:rs.data
                })
            }
        })
    }

    componentDidMount(){
        this.fetch_product_data();
    }



    // const {name,imageUrl,description,mrp,discount_type,discount,selling_price,net_weight,unit,hifen_name}=this.props;

    render() {
        const {productdata}=this.state;
        return (
            <main className="main">
                <ProductDetails {...productdata} />
                <Footer/>
        </main>
        );
    }

}

export default withRouter(ProductInfo);