import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom"
import * as authActions from './store/actions/authActions'
import { connect } from 'react-redux'

import AuthView from './views/AuthView/AuthView'
import HomeView from './views/HomeView/HomeView'
import FakeNewsView from './views/FakeNewsView/FakeNewsView'
import ProfileView from './views/ProfileView/ProfileView'
import InfoView from './views/info/info'
import DetailPostView from './views/DetailPostView/DetailPostView';
import userListView from './views/userList/userListView';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import LoggedOutRoutes  from 'containers/AppRouter/LoggedOutRoutes';
import LoggedInRoutes from 'containers/AppRouter/LoggedInRoutes';

const App = ({auth,user,onTryAutoSignup}) => {

  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const constructor = () => {
    if (constructorHasRun) return;
    onTryAutoSignup();
    setConstructorHasRun(true);
  };
  constructor();
  return (

        <Switch>
          
             <LoggedOutRoutes exact path="/forgotPassword" component={ForgotPassword} />

              <LoggedOutRoutes exact path="/auth" component={AuthView}/>          
          
              <LoggedInRoutes user={user} auth={auth} exact path="/" component={HomeView} />        
             
              <LoggedInRoutes user={user}  auth={auth} exact path="/fakeNews" component={FakeNewsView} />         
            
              <LoggedInRoutes user={user}  auth={auth} exact path="/:id" component={ProfileView} />

         
            
              <LoggedInRoutes user={user}  auth={auth} exact path="/details/:id" component={DetailPostView} />
            
              <LoggedInRoutes  user={user} auth={auth} exact path="/infoByID/:id" component={InfoView} />
       
            
              <LoggedInRoutes user={user}  auth={auth} exact path="/updatePassword/:id" component={InfoView} />
      
            
              <LoggedInRoutes  user={user} auth={auth} exact path="/all/:id" component={userListView} />
          
          
        </Switch>

  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
