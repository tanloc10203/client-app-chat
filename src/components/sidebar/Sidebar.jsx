import { NavLink } from "react-router-dom";
import "./sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <i className="fas fa-asterisk"></i>
      </div>
      <div className="sidebar-main">
        <NavLink to="/home" className="sidebar-item" activeClassName="active">
          <i className="fas fa-home"></i>
        </NavLink>
        <NavLink to="/chat" className="sidebar-item sidebar-mess" >
          <i className="fas fa-comment-alt"></i>
        </NavLink>
        <NavLink to="/add-friend" className="sidebar-item sidebar-friend">
          <i className="fas fa-user-friends"></i>
        </NavLink>
        <div className="sidebar-item sidebar-location">
          <i className="fas fa-location-arrow"></i>
        </div>
        <div className="sidebar-item sidebar-trash">
          <i className="fas fa-trash"></i>
        </div>
        <div className="sidebar-item sidebar-setting">
          <i className="fas fa-cog"></i>
        </div>
      </div>
      <div className="sidebar-center">
        <i className="fas fa-align-center"></i>
      </div>
    </div>
  )
}

Sidebar.propTypes = {

}

export default Sidebar

