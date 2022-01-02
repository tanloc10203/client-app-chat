import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HanleLoading from '../../components/handleLoading/HanleLoading';
import InputField from '../../custom-fields/inputField/InputField';
import InputPassword from '../../custom-fields/inputPassword/InputPassword';
import './login.scss';
import { handleLogin } from './loginSlice';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(state => state.login);
  const { user, errorss, pedding } = state;

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const validate = () => {
    let isError = false;
    let errors = {};
    if (!username) {
      errors.username = "Không được để trống";
      isError = true;
    }
    if (!password) {
      errors.password = "Không được để trống";
      isError = true;
    }
    errors && setErrors(errors);
    return isError;
  }

  const handleLoginUser = async () => {
    const checkError = validate();
    if (!checkError) {
      const data = {
        username,
        password,
      }

      dispatch(handleLogin(data));

      if (user) {
        setErrors({});
        setUsername("");
        setPassword("");
      }
    }
  }

  return (
    <>
      {pedding && <HanleLoading />}
      <div className="login">
        <div className="container">
          <div className="login-main">
            <h4 className="title">Đăng nhập</h4>
            {errorss ? <p className=" mt-2 error text-center">{errorss.err}</p> : null}
            <InputField
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={(e) => e.code === "Enter" && handleLoginUser()}
              label="Tài khoản"
              placeholder=" "
            />
            {errors && <p className="error">{errors.username}</p>}
            <InputPassword
              value={password}
              type={showPassword ? "text" : "password"}
              label="Mật khẩu"
              onChange={e => setPassword(e.target.value)}
              placeholder=" "
              onKeyDown={(e) => e.code === "Enter" && handleLoginUser()}
              showPassword={showPassword}
              onShowPassword={() => setShowPassword(!showPassword)}
            />
            {errors && <p className="error">{errors.password}</p>}
            <button className="btn mt-3" onClick={handleLoginUser}> Đăng nhập</button>
            <div className="login-control">
              <div className="forget">Quên mật khẩu ?</div>
              <Link to="/register" className="register">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Login;

