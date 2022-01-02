import logo from "../../../images/logo192.png";
import "./mainRight.scss";
import MessageControl from "./MessageControl";

function MainRight({ chat, addFriend, receiver }) {
  return (
    <div className="main-right">
      {!chat
        ? (
          <div className="main-right--content">
            <div className="main-right--title">
              {addFriend
                ? "Kết nối với bạn bè để có trải nghiệm tốt nhất"
                : "Chào mừng bạn đến với ứng dụng chat của chúng tôi"
              }
            </div>
            <div className="main-right--logand">
              Ứng dụng sẽ tạo cho bạn một trải nghiệm tốt nhất
            </div>
            <img src={logo} alt="Welcome" className="main-right--img" />
          </div>
        ) : (
          <MessageControl
            receiver={receiver}
          />
        )}
    </div>
  )
}

MainRight.propTypesDefaults = {
  receiver: {}
}

export default MainRight;

