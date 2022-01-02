import React from 'react'
import Header from '../../components/header/Header';
import MainPage from '../../components/main-page/MainPage';
import Sidebar from '../../components/sidebar/Sidebar';

function Chat() {
  return (
    <div className="chat">
      <Header />
      <Sidebar />
      <MainPage addFriend/>
    </div>
  )
}

export default Chat

