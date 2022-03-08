import Signup from "../components/auth/Signup"
import Splash from "../components/auth/Splash"

const Auth = (props) => {
    const {component} = props
   

    return (
        <div className="container">
            <Splash auth_component={component ? component :<Signup />} />
            
        </div>
    )
}

export default Auth;