import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetFriend } from "../pageSlice";
import "./mainLeft.scss";
import InputSearch from "./page/InputSearch";
import Item from "./page/Item";
import ItemFriend from "./page/ItemFriend";
import ModalAddFriend from "./page/ModalAddFriend";

function MainLeft({ home, addFriend, onChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, users } = useSelector(state => state.login);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (users && users.length) {
      const newUsers = users.filter(item => item.username !== user.username);
      setData(newUsers);
    }
  }, [users, user]);

  useEffect(() => {
    dispatch(handleGetFriend(user && user._id.toString()));
  }, [user, dispatch]);

  return (
    <div className="main-left">
      {!addFriend
        ? <InputSearch
          type="text"
          name=""
          className="form-control custom-form"
          placeholder=" "
          label="Tìm Kiếm"
        />
        : <button
          className="btn mt-2 custom-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          Thêm bạn
        </button>
      }
      {
        isOpen &&
        <ModalAddFriend
          addFriend={addFriend}
          onClose={() => setIsOpen(false)}
        />
      }
      <div className="main-left--content">
        {
          home ?
            (<div className="main-left--title">
              <span className="main-left--head">Danh sách đang online</span>
              <span className="main-left--num">{data ? data.length : 0}</span>
            </div>) :
            (<div className="main-left--title">
              <span className="main-left--head">Tất cả bạn bè</span>
              <span className="main-left--num">0</span>
            </div>)
        }
        <div className="main-left--group">
          {
            home
              ? (
                data.map((item, index) => (
                  < ItemFriend
                    key={index}
                    name={item.fullname}
                    subName={item.username}
                    online
                    onChat={() => onChat(item)}
                  />
                ))
              )
              : (
                addFriend
                  ? <p style={{ marginTop: '10px', color: 'red' }}><b>Chức năng này không được sử dụng</b></p>
                  : < Item
                    message="Hello các bạn đây là đoạn chat"
                    name="Name"
                  />
              )
          }
        </div>
      </div>
    </div>
  )
}

MainLeft.propTypes = {

}

export default MainLeft

