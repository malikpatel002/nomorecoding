import Navbar from "./components/navbars";
import { Route, Switch } from "react-router";

function temp() {
  return (
    <>
      <Navbar>
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Navbar>
    </>
  );
}

export default temp;
