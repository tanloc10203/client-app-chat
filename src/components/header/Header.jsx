import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPrevGroupMessage, setStatusMessage } from "../../features/chat/chatSlice";
import { setUsers } from "../../features/login/loginSlice";
import { useCutName, useSocket } from "../../hooks";
import "./header.scss";
import Notification from "./page/Notification";

function Header() {
  const [toggle, setToggle] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const { user } = useSelector(state => state.login);
  const socket = useSocket();
  const notification = true;
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState(0);
  const closeRef = useRef(null);
  const cutName = useCutName(user);
  const dispatch = useDispatch();

  const sortNames = (username1, username2) => {
    return [username1, username2].sort().join("-");
  }

  const getHoursAndMinutes = () => {
    const hours = new Date(Date.now()).getHours();
    const minutes = new Date(Date.now()).getMinutes();
    return hours + ":" + minutes;
  }

  useEffect(() => {
    socket?.on("CHANGE_STATUS", data => {
      const key = sortNames(data.senderId, data.receiverId);
      // console.log("check data header, ", data);
      dispatch(setStatusMessage({ data, key }));
    })
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("GET_MESSAGE", data => {
      const newData = {
        ...data,
        createdAt: getHoursAndMinutes(),
      }
      const { receiverId, ...others } = newData;
      // console.log("check get message: ", others);
      const key = sortNames(data.senderId, data.receiverId);
      dispatch(setPrevGroupMessage({ others, key }));
    })
  }, [socket, dispatch])

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    user && socket?.emit("JOIN", user);

    socket?.on("JOIN", data => {
      dispatch(setUsers(data));
    });
  }, [socket, user, dispatch]);

  useEffect(() => {
    setNum(notification.length > 0 && notification.length)
  }, [notification]);

  useEffect(() => {
    const handleMouseDown = e => {
      if (closeRef.current && !closeRef.current?.contains(e.target))
        setOpen(false);
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [closeRef]);

  const handleToggleTheme = () => {
    if (toggle) {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
      setToggle(false);
    } else {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
      setToggle(true);
    }
  }

  const handleCloseNotification = () => {
    setOpen(!open);
    setNum(0);
  }

  const handleAcceptFriend = indexInput => {
    // socket?.emit("ACCEPT", {
    //   data: user,
    //   senderId: senderID && senderID,
    //   senderName: senderName && senderName
    // });
    // setNotification(prev => prev.filter((item, index) => index !== indexInput));
  }

  const handleLogout = () => {
    socket?.emit("LOGOUT", user);
  }

  return (
    <div className="header">
      <div className="header-left">
        <h5 className="header-logo">Chat</h5>
        <div className="header-toggle--mode">
          <div className="header-toggle--mode-light" onClick={handleToggleTheme}>
            <span>🌞</span>
          </div>
          <div className="header-toggle--mode-dark" onClick={handleToggleTheme}>
            <span>🌜</span>
          </div>
          <div
            onClick={handleToggleTheme}
            className="header-toggle--change"
            style={toggle ? { right: 26 } : {}}
          ></div>
        </div>
        <div className="notification" onClick={handleCloseNotification}>
          <i className="fas fa-bell"></i>
          {notification && num > 0 && <span>{num}</span>}
        </div>
        {open &&
          <div className="notifications" ref={closeRef}>
            <div className="notifications-title">Thông báo</div>
            <div className="notifications--list">
              {notification && !_.isEmpty(notification) && notification.length > 0 ?
                notification.map((item, index) => (
                  <Notification
                    msg={item.notification}
                    imgText={item.senderName}
                    key={index}
                    index={index}
                    onAccept={handleAcceptFriend}
                  />
                )) :
                <p className="no-notifications">Không có thông báo</p>
              }
            </div>
          </div>
        }
      </div>
      <div className="header-right">
        <div className="header-img">{cutName || "N"}</div>
        <div className="header-name">
          {(!_.isEmpty(user) && user.fullname) || "Họ và tên"}
        </div>
        <Link
          to="/logout"
          className="header-logout"
          title="Đăng xuất"
          onClick={handleLogout}
        >
          <i className="fas fa-power-off" ></i>
        </Link>
      </div>
    </div>
  )
}

export default Header
