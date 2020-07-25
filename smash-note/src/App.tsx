import React from 'react';
import routes from './routes';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

const App = () => {
  const routeList = routes.map(({
    component: Comp,
    ...route
  }) => (
    <Route
      key={route.path}
      {...route}
      component={Comp}
    />
  ));

  return (
    <Router>
      <Switch>
        {routeList}
        {/* <Route component={Page404}/> */}
      </Switch>
    </Router>
  );
}

export default App;
