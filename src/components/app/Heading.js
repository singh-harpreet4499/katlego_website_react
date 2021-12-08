
export function Heading(props){
    return (
        <div className="container">
            {props.horizontalLine === false ? <div className="mt-2 mb-3"></div> : <hr className="mt-2 mb-3" />}
            <ul
                className="
                nav nav-pills nav-border-anim nav-big
                justify-content-center
                mb-2
                "
                role="tablist"
            >
                <li className="nav-item">
                <div
                    className="nav-link lean"
                    >{props.title.toUpperCase()}
                </div>
                </li>
            </ul>
        </div>
    )
}
