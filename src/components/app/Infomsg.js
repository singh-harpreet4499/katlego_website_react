const Infomsg = (props) => {
    if(props.message!==''){
        const data = <span className={"badge badge-"+props.type}>{props.message}</span>
        return data;
    }else{
        return '';
    }
  
}

export default Infomsg