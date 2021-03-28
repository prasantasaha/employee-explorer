import { Route, Switch, Redirect } from 'react-router-dom';
import Explorer from './views/explorer/Explorer';
import NoMatch from './views/common/NoMatch';
import Overview from './views/overview/Overview';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/explorer" component={Explorer} />
        <Route exact path="/">
          <Redirect to="/explorer" />
        </Route>
        <Route path="/overview/:name" component={Overview} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
