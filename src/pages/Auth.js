import Signup from "../components/auth/Signup"
import Splash from "../components/auth/Splash"

const Auth = (props) => {
    const {component} = props
   

    return (
        <div>
            <Splash auth_component={component ? component :<Signup />} />
            
        </div>
    )
}

export default Auth;