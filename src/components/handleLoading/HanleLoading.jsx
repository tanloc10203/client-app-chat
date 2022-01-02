import React from 'react'
import "./handleLoading.scss";

function HanleLoading(props) {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    </div>

  )
}

export default HanleLoading

