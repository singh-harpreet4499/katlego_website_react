import { useEffect } from "react"
import { useState } from "react"
import { get_settings } from "../server/api"
import parse from 'html-react-parser'
import { useSelector } from "react-redux"
const PaymentMethods = (props) => {

    const [content,setContent] = useState(null)
    const settings = useSelector(state=>state.global.settings);
    const get_data =async () => {
        // await get_settings({}).then((rs)=>{
        //     if(rs.status){
        //         setContent(rs.data.payment_policy)
        //     }
        // })
        setContent(settings.payment_policy)
    }

    useEffect(() => {
        get_data()
    }, [settings])

    return (
            <div className="page-content pb-0">
                <div className="container">
                    <h3 class="text-center">Payment Methods </h3>
                    {content ? parse(content) : ''}
                </div>
            </div>
    );
}

export default PaymentMethods
