import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider, { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={HomePage} />
            {/* other routes */}
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;