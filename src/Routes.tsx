import { Route, Switch, Redirect } from 'react-router-dom';
import Explorer from './views/explorer/Explorer';
import NoMatch from './views/common/NoMatch';
import Overview from './views/overview/Overview';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/explorer`}
          component={Explorer}
        />
        <Route exact path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/explorer`} />
        </Route>
        <Route
          path={`${process.env.PUBLIC_URL}/overview/:name`}
          component={Overview}
        />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
