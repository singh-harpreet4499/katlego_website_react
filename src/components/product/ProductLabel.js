const ProductLabel = (props) => {

    const {color,name} = props;
    var class_name = 'product-label label-circle label-new best-bu new-ribb';
    if(color==='red'){
        class_name = 'product-label label-circle label-new best-bu';
    }else if(color==='blue'){
        class_name = 'product-label label-circle label-new best-blue-label';
    }
    return (
        
        <span className={class_name}>
            {name}
        </span>
    )
}

export default ProductLabel