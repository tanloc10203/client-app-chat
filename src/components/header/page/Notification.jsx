import React, { memo } from 'react';
import { useCutName } from '../../../hooks';

function Notification({ msg, imgText, onAccept, index }) {
  const cutName = useCutName(imgText);

  return (
    <>
      <div className="notifications-item">
        <div className="notifications-item--img">{cutName}</div>
        <div className="notifications-item--msg">
          <span>{msg}</span>
          <div className="notifications-accept">
            <button className="btn w-50" onClick={() => onAccept(index)}>Đồng ý</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Notification);
