import { LazyLoadImage } from 'react-lazy-load-image-component';


const LazyImage = (props) => {

    const {src,alt,className} = props
    return(
        <div>
            <LazyLoadImage
            alt={alt}
            effect="blur"
            // height={image.height}
            src={src} // use normal <img> attributes as props
            // width={image.width} 
            className={className}
            />
            {/* <span>{image.caption}</span> */}
        </div>
    )
}
export default LazyImage