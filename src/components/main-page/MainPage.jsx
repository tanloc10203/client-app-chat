import _ from "lodash";
import { useCallback, useRef, useState } from "react";
import MainLeft from "./main-left/MainLeft";
import MainRight from "./main-right/MainRight";
import "./mainpage.scss";

function MainPage(props) {
  const [hidden, setHidden] = useState(false);
  const [dataReceiver, setDataReceiver] = useState({});
  const receiverRef = useRef(null);

  const handleOnChat = useCallback((data) => {
    receiverRef.current = data.username;
    setDataReceiver(data);
    setHidden(true);
  }, []);


  return (
    <div className="main-page">
      <MainLeft
        chat={props.chat || false}
        addFriend={props.addFriend || false}
        home={props.home || false}
        onChat={handleOnChat}
      />
      <MainRight
        chat={props.chat || hidden}
        addFriend={props.addFriend || false}
        receiver={!_.isEmpty(dataReceiver) ? dataReceiver : null}
        receiverRef={receiverRef && receiverRef.current}
      />
    </div>

  )
}

export default MainPage

