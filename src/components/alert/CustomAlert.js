import { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch } from 'react-redux';
import { closeCustomAlert } from '../../redux/alert/alert.action';
// import swal from 'sweetalert';

const CustomAlert = (props) => {
    const {message,title} = props;
    const dispatch = useDispatch();

    const [show,setShow] = useState(false);
    const [danger,setDanger] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        if (props.showModel) {
            setShow(true);
            setTimeout(() => {
                dispatch(closeCustomAlert())
                setShow(false)
            }, 5000);
        } 
    }, [props])

    useEffect(() => {
        if (props.success) {
            setSuccess(true);
        } 
    }, [props])

    useEffect(() => {
        if (props.danger) {
            setDanger(true);
        } 
    }, [props])

  

    const onCancel = () => {
        setShow(false);
    }
   

    return (
        <div>
            <SweetAlert  danger={danger} success={success} title={title ?title :"Message!" } show={show} onConfirm={onCancel} onCancel={onCancel} >
               {message}
            </SweetAlert>
        </div>
    )
}
export default CustomAlert;