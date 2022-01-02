import React, { useEffect } from 'react';
import Header from '../header/Header';
import MainPage from '../main-page/MainPage';
import Sidebar from '../sidebar/Sidebar';


function Home() {
  useEffect(() => {
    document.title = "Trang chủ"
  }, []);

  return (
    <div className="home">
      <Header />
      <Sidebar />
      <MainPage home/>
    </div>
  )
}

export default Home

