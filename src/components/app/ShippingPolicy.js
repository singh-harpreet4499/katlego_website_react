import { useEffect } from "react"
import { useState } from "react"
import { get_settings } from "../server/api"
import parse from 'html-react-parser'
const ShippingPolicy = (props) => {
    const [content,setContent] = useState(null)

    const get_data =async () => {
        await get_settings({}).then((rs)=>{
            if(rs.status){
                setContent(rs.data.shipping_policy)
            }
        })
    }

    useEffect(() => {
        get_data()
    }, [])

    return (
            <div className="page-content pb-0">
                <div className="container">
                    <h3 class="text-center">Shipping Policy </h3>
                     { content ? parse(content) : ''}

                </div>
            </div>
    );
}

export default ShippingPolicy