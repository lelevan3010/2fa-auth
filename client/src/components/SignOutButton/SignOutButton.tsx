import React, { useContext } from "react";
import {Route, Redirect} from 'react-router-dom'

import { AuthContext } from '../../context/auth/AuthContext'

export default function PrivateRoute({component: Component, path, ...rest}: any) {
    const {Auth} = useContext(AuthContext)
    console.log('from private route', Auth);
    return <Route
        path={path}
        render={(props: any)=>(
                Auth.loggedIn ?
                (<Component {...props} {...rest}/>) :
                (<Redirect to='/'/>)
            )
        }
    />
}
