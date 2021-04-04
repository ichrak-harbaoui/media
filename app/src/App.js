import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom"
import * as authActions from './store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import AuthView from './views/AuthView/AuthView'
import HomeView from './views/HomeView/HomeView'
import ProfileView from './views/ProfileView/ProfileView'
import info from './views/info/info'
import InfoView from './views/info/info'
import DetailPostView from './views/DetailPostView/DetailPostView';

const App = props => {


  console.log({props});
  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const constructor = () => {
    if (constructorHasRun) return;
    props.onTryAutoSignup();
    setConstructorHasRun(true);
  };
  constructor();
  
  return (
    <>
      {
        !props.auth.isAuthenticated ? <Redirect to={"/auth"}></Redirect> : null
      }
      {
        <Switch>
          {
            props.user.loading ? null :
              <Route exact path="/">
                <HomeView />
              </Route>
          }
          {
            props.user.loading ? null :
              <Route exact path="/:id" component={ProfileView} />

          }
          {
            props.user.loading ? null :
              <Route exact path="/details/:id" component={DetailPostView} />

          }
          {
            props.user.loading ? null :
              <Route exact path="/infoByID/:id" component={InfoView} />
          }
          
          <Route exact path="/auth">
            <AuthView />
          </Route>
          
        </Switch>
      }
    </>
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
