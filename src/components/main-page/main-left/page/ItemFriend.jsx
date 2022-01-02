import React from 'react';
import { useSelector } from 'react-redux';
import { useCutName } from '../../../../hooks';

function ItemFriend({ name, subName, online, onChat, }) {
  const cutName = useCutName({ fullname: name });
  const { notifications } = useSelector(state => state.chat);

  return (
    <div className="main-left--item" onClick={onChat}>
      <div className="main-left--img">
        <div className="main-left--char">{cutName}</ div>
        <div className="main-left--dots" style={{ backgroundColor: !online && '#ccc' }}></div>
      </div>
      <div className="main-left--item-content main-left--item-add">
        <span className="main-left--name">{name}</span>
        <span className="main-left--sub-name">({subName})</span>
      </div>
      {
        notifications
          ? <span className="main-left--round"></span>
          : null
      }
    </div >
  )
}

export default ItemFriend
