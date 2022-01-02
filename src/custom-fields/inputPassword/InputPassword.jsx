function InputPassword(props) {
  const { onShowPassword,  showPassword, label, ...rest } = props;
  return (
    <div className="form-group">
      <input
        {...rest}
        className="form-control"
      />
      <label htmlFor="password" className="label">{label}</label>
      {
        <i
          className={`hidden-pass ${showPassword ? "far fa-eye" : "fas fa-eye-slash"} `}
          onClick={onShowPassword}
        ></i>
      }
    </div>
  )
}

export default InputPassword
