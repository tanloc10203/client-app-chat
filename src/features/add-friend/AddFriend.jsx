import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import MainPage from '../../components/main-page/MainPage'
import Sidebar from '../../components/sidebar/Sidebar'

function AddFriend() {
  useEffect(() => {
    document.title = "Thêm bạn";
  }, []);

  return (
    <div className="add-friend">
      <Header />
      <Sidebar />
      <MainPage addFriend/>
    </div>
  )
}

export default AddFriend
