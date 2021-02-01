import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "./Components/Main";
import SideBarAndHeader from "./Components/SideBarAndHeader";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
    return (
        <BrowserRouter>
            <SideBarAndHeader/>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
