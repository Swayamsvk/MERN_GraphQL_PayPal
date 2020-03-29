import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthContext from './context/auth-context';
import './App.css';

// import AuthPage from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import MainNavigation from './components/layout/MainNavigation';
import Navbar from './components/layout/Navbar';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <Navbar />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/register" exact />}
                {this.state.token && <Redirect from="/" to="/products" exact />}
                {this.state.token && <Redirect from="/register" to="/products" exact />}
                {this.state.token && <Redirect from="/login" to="/products" exact />}

                {!this.state.token && (<Route path="/register" component={Register} />)}
                {!this.state.token && (<Route path="/login" component={Login} />)}

                <Route path="/products" component={null} />
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;