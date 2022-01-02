import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupMessage, setNotification } from '../../../../features/chat/chatSlice';
import { useCutName, useSocket } from '../../../../hooks';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const sortNames = (username1, username2) => {
  return [username1, username2].sort().join("-");
}

function MessageControl({ receiver }) {
  const { user } = useSelector(state => state.login);
  const messageRef = useRef(null);
  const scrollRef = useRef(null);
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { groupMessage, statusMessage, notifications } = useSelector(state => state.chat);
  const [newMessage, setNewMessage] = useState(null);
  const dispatch = useDispatch();
  const cutName = useCutName(receiver && receiver);
  const cutNameStatus = useCutName(user && user);
  const [status, setStatus] = useState(null);
  const [media, setMedia] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  receiver = receiver || [];

  const handleSendMessage = useCallback(() => {
    let data = {};
    if (message && message !== '') {
      data = {
        message,
        receiverId: receiver.username,
        senderId: user.username,
        status: 2,
        image: media && media.image,
        content: media && media.content,
        urlImage: media && media.urlImage,
        notifications: true
      }
    }

    if (media) {
      data = {
        receiverId: receiver.username,
        senderId: user.username,
        status: 2,
        image: media && media.image,
        content: media && media.content,
        urlImage: media && media.urlImage,
        notifications: true
      }
      setMedia(null);
    }


    if (data && Object.keys(data).length > 0) {

      socket?.emit('SEND_MESSAGE', data);
      setMessage("");

      messageRef.current.focus();

      const key = sortNames(user.username, receiver.username);
      const tempGroupMessage = { ...groupMessage };

      if (key in tempGroupMessage) {
        tempGroupMessage[key] = [
          ...tempGroupMessage[key],
          { ...data }
        ];
      } else
        tempGroupMessage[key] = [{ ...data }];

      dispatch(setGroupMessage({ ...tempGroupMessage }));
    }
  }, [message, receiver, user, socket, groupMessage, media, dispatch]);

  const handleChangeMessage = useCallback(event => {
    setMessage(event.target.value);
    dispatch(setNotification(false));
    socket?.emit("CHANGE_STATUS", {
      receiverId: receiver.username,
      senderId: user.username,
      notifications: false,
      status: 1
    });

  }, [socket, user, receiver, dispatch]);

  useEffect(() => {
    if (statusMessage) {
      const key = Object.keys(statusMessage)
        ? statusMessage[sortNames(user.username, receiver.username)]
        : [];
      let valueKey = 0;
      if (key !== undefined) {
        const keyLength = key.length;
        for (let i = 0; i < keyLength; i++)
          if (key[i] === 2) valueKey = key[i];
          else valueKey = key[i].status;
      }
      setStatus(+valueKey);
    }

  }, [statusMessage, receiver, user]);

  useEffect(() => {
    const newReceiver = groupMessage
      ? groupMessage[sortNames(user.username, receiver.username)]
      : [];

    setNewMessage(newReceiver);
  }, [groupMessage, receiver, user]);

  useLayoutEffect(() => {
    if (scrollRef) {
      scrollRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const handleChangeMedia = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    const urlImage = file && URL.createObjectURL(file);

    reader.onload = () => {
      const result = reader.result;
      setMedia({
        urlImage,
        image: true,
        content: result,
        name: file.name
      });
    }

    reader.onerror = error => {
      console.log(error);
    }
  }

  return (
    <div className="main-right--chat">
      <div className="main-right--chat__header">
        <div className="main-right--chat__back">
          <i className="fas fa-long-arrow-alt-left"></i>
        </div>
        <div className="main-right--chat__header-avatar">{cutName || "N"}</div>
        <div className="main-right--chat__header-info">
          <p className="name">{receiver && receiver.fullname}</p>
          {/* <p className="time">191982827272616</p> */}
        </div>
      </div>
      <div className="main-right--chat-content">

        <div className="main-right--item" ref={scrollRef}>
          {newMessage && newMessage.length > 0 && newMessage.map((item, index) => {
            const styleMain = {
              flexDirection: item.receiverId ? 'row-reverse' : 'column',
            }

            const style = {
              backgroundColor: item.receiverId ? '#0084ff' : null,
              color: item.receiverId ? '#ffffff' : null
            }

            if (item.image) {
              return (
                <div className="main-right--item-main" style={styleMain} key={index}>
                  <div className="main-right--item-content">
                    {!item.receiverId ? <div className="main-right--name">{cutName || "N"}</div> : null}
                    <img onClick={() => setIsOpen(true)} className="main-right--chat-content__media" src={item.content} alt="" />
                  </div>
                  {!item.receiverId
                    ? <span className="time">{item.createdAt}</span>
                    : null
                  }
                  {isOpen &&
                    <Lightbox
                      mainSrc={item.urlImage}
                      onCloseRequest={() => setIsOpen(false)}
                    />
                  }
                </div>
              )
            } else
              return (
                <div className="main-right--item-main" style={styleMain} key={index}>
                  <div className="main-right--item-content">
                    {!item.receiverId ? <div className="main-right--name">{cutName || "N"}</div> : null}
                    <div className="main-right--wrap">
                      <span
                        className="main-left--mess"
                        style={style}
                      >
                        {item.message}
                      </span>
                    </div>
                  </div>
                  {!item.receiverId
                    ? <span className="time">{item.createdAt}</span>
                    : null
                  }
                </div>
              )
          })}
          {status === 1
            ? <div className="status">
              <div className="status--name">{cutNameStatus || 'N'}</div>
              <div className="balls">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            : null
          }
        </div>
      </div>
      <div className="main-right--chat-input__container">
        {
          media && media !== null &&
          <div className="preview-img">
            <div className="preview-img--container">
              <div className="preview-img--item">
                <img src={media.content} alt="" />
                <span
                  onClick={() => setMedia(null)}
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
        }
        <div className="main-right--chat-input">
          <div className="form-group m-0 w-100">
            <input
              className="main-right--input form-control"
              placeholder=" "
              value={message}
              onChange={handleChangeMessage}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              ref={messageRef}
            />
            <label className="label">Nội dung chat</label>
          </div>
          <div className="main-right--send-img">
            <input
              type="file"
              id="send-img"
              hidden
              onChange={handleChangeMedia}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <label htmlFor="send-img">
              <i className="fas fa-images"></i>
            </label>
          </div>
          <div className="main-right--send">
            <i className="fas fa-location-arrow" onClick={handleSendMessage}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageControl;

