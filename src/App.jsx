import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import NotFound from "./components/notFound/NotFound";
import AddFriend from "./features/add-friend/AddFriend";
import Chat from "./features/chat/Chat";
import Login from "./features/login/Login";
import Resgister from "./features/resgister/Resgister";

function App() {
  const { isLoggedIn, user } = useSelector(state => state.login);


  return (
    <div className="App">
      <Router  >
        <Switch>
          <Redirect exact from="/" to="/login" />

          <Route path="/home">
            {user ? <Home /> : <Redirect to="login" />}
          </Route>

          <Route path="/login">
            {isLoggedIn ? <Redirect to="/home" /> : <Login />}
          </Route>

          <Route path="/register">
            <Resgister />
          </Route>

          <Route path="/chat">
            {!isLoggedIn ? <Redirect to="/login" /> : <Chat />}
          </Route>

          <Route path="/add-friend">
            {!isLoggedIn ? <Redirect to="/login" /> : <AddFriend />}
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div >
  );
}

export default App;
