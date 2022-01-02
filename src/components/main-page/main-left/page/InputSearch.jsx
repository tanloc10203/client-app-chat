import React from 'react'

function InputSearch({ onClickSearch, label, ...props }) {
  return (
    <div className="main-left--search">
      <div className="form-group my-1">
        <input
          {...props}
        />
        <label className="label">{label}</label>
        <div className="icon-search" onClick={onClickSearch}>
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  )
}

export default InputSearch
