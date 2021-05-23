import React from 'react'
import { Route,Redirect } from "react-router-dom"


const LoggedInRoutes = ({auth,user,path,exact,component}) => {
const {isAuthenticated} = auth 
if(!isAuthenticated) return <Redirect to='/auth' />
return user.loading ? null : <Route path={path} exact={exact} component={component} />
}


export default LoggedInRoutes;
