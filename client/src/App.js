import { Route, Switch} from "react-router-dom"
import React from 'react';
import Create from './views/Create/Create';
import Detail from './views/Detail/Detail';
import Home from './views/home/Home';
import LandingPage from "./views/Landing/Landing";
import PATHROUTES from "./helpers/pathRoutes";
import axios from "axios";
axios.defaults.baseURL= `http://localhost:3001`


function App() {
  return (


    <div className="App">
      <Switch>
        <Route exact path={PATHROUTES.LANDING} component={LandingPage} />
        <Route exact path={PATHROUTES.HOME} component={Home} />
        <Route exact path={PATHROUTES.DETAIL} component={Detail} />
        <Route exact path={PATHROUTES.FORM_PAGE} component={Create} />
      </Switch>
    </div>


  );
}

export default App;
