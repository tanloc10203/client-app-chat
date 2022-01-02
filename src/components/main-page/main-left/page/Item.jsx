import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useCutName } from "../../../../hooks";

function Item(props) {
  const { name, message, addFriend, item, onAddFriend } = props;
  const { user } = useSelector(state => state.login);
  const { fullname, subname, _id } = user;
  const [add, setAdd] = useState("Kết bạn");
  let newName = useCutName(item);

  const handleAddFriend = item => {
    setAdd("Đã gửi");
    onAddFriend({ item, fullname, subname, _id });
  }

  return (
    <div className="main-left--item">
      {!addFriend ? (<>
        <div className="main-left--img">
          <div className="main-left--char">L</ div>
          <div className="main-left--dots"></div>
        </div>
        <div className="main-left--item-content">
          <span className="main-left--name">{name}</span>
          <span className="main-left--text">{message}</span>
        </div>
        <div className="main-left--notifications"><span>2</span></div>
      </>) : (<>{item && <>
        <div className="main-left--img">
          <div className="main-left--char">{newName}</ div>
        </div>
        <div className="main-left--item-content main-left--item-add">
          <span className="main-left--name">{item && `${item.fullname}`}</span>
          <span className="main-left--sub-name">({item && item.username})</span>
        </div>
        <div className="main-left--add-friend" onClick={() => handleAddFriend(item)}>
          {add}
          <i className="fas fa-user-plus"></i>
        </div>
      </>}</>)}
    </div>
  )
}

export default Item
