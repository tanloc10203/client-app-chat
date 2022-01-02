function InputField({ label, ...rest }) {
  return (
    <div className="form-group">
      <input
        {...rest}
        className="form-control"
      />
      <label className="label">{label}</label>
    </div>
  )
}

export default InputField
