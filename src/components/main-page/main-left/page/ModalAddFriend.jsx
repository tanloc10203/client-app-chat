import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../hooks";
import Loading from "../../../loading/Loading";
import { handleSearchFriend } from "../../pageSlice";
import InputSearch from "./InputSearch";
import Item from "./Item";
import "./modalAddFriend.scss";

function ModalAddFriend({ addFriend, onClose }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.page);
  const modalRef = useRef(null);
  const socket = useSocket();

  const handleSearch = useCallback(async () => {
    if (search) {
      dispatch(handleSearchFriend({ search }));
    }
  }, [search, dispatch]);

  useEffect(() => {
    const handleMouseDown = e => {
      if (modalRef.current && !modalRef.current?.contains(e.target))
        onClose();
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [modalRef, onClose]);

  const handleAddFriend = data => {
    if (data) {
      const { subname, fullname, item, _id } = data;
      const newData = {
        sender: fullname,
        uesrname: subname,
        data: item,
        senderId: _id,
      }
      socket?.emit("ADD_FRIEND", newData);
    }
  }

  return (
    <div className="modal">
      <div className="modal-main" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-title">Tìm kiếm bạn bè</div>
          <div className="modal-close" onClick={onClose}>&times;</div>
        </div>
        <div className="modal-content">
          <InputSearch
            type="text"
            name=""
            className="form-control custom-form"
            placeholder=" "
            label="Tìm Kiếm"
            onChange={(e) => setSearch(e.target.value)}
            onClickSearch={handleSearch}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />

          <div className="modal-list">
            {pending ?
              <div className="modal-loading">
                <Loading />
              </div>
              : (
                data && data.length > 0
                  ? data.map((item, index) => (
                    <Item
                      item={item}
                      addFriend={addFriend}
                      key={index}
                      onAddFriend={handleAddFriend}
                    />
                  ))
                  : <div className="modal-no">Không tìm thấy</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddFriend
