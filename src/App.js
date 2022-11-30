import "./App.css";
import Mainpage from "./components/MainPage/mainpage.component";
import UserComponent from "./components/UserComponent/user.component";
import Redirect from "./components/RedirectComponent/redirect.component";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/:id" exact component={Redirect} />
      <Route path="/" exact component={Mainpage} />
      <Route path="/me" exact component={UserComponent} />
    </Router>
  );
}

export default App;
