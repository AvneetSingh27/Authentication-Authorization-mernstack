import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import Signup from './Signup';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import NotFound from './NotFound';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
const App = () => (
  <BrowserRouter>
    <Header/>
    <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={SignIn} />
          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
          <UserRoute exact path='/user/dashboard' component={UserDashboard} />
          <Route  component={NotFound} />
        </Switch>
    </main>
  </BrowserRouter>
);
  
export default App;
