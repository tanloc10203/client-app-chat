import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../api/auth';
import HanleLoading from '../../components/handleLoading/HanleLoading';
import InputField from '../../custom-fields/inputField/InputField';
import InputPassword from '../../custom-fields/inputPassword/InputPassword';
import { regexName, regexPass, regexUser } from '../../utils/contain';
import './resgister.scss';


function Resgister(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  const validate = () => {
    const errors = {};
    let isError = false;
    let check;

    if (!fullname) {
      errors.fullname = "Không được để trống";
      isError = true;
    } else {
      check = regexName.test(fullname);
      if (!check) {
        errors.fullname = "Vui lòng nhập đúng họ và tên";
        isError = true;
      }
    }

    if (!username) {
      errors.username = "Không được để trống";
      isError = true;
    } else {
      check = regexUser.test(username);
      if (!check) {
        errors.username = "Tài khoản từ 6 đến 32 kí tự";
        isError = true;
      }
    }

    if (!password) {
      errors.password = "Không được để trống";
      isError = true;
    } else {
      check = regexPass.test(password);
      if (!check) {
        errors.password = "Viết hoa kí tự đầu, mật khẩu từ ít nhất 6 kí tự";
        isError = true;
      }
    }

    if (!verifyPassword) {
      errors.verifyPassword = "Không được để trống";
      isError = true;
    } else {
      if (verifyPassword !== password) {
        errors.verifyPassword = "Mật khẩu xác thực không chính xác";
        isError = true;
      }
    }

    setErrors(errors);
    return isError;
  }

  const handleResgister = async () => {
    let isError = validate();
    if (!isError) {
      setLoading(true);
      const data = {
        username,
        password,
        fullname,
      }
      const response = await authApi.resgister(data);
      if (response && response.error === 0) {
        toast.success("Đăng ký thành công");
        setLoading(false);
        setUsername("");
        setVerifyPassword("");
        setPassword("");
        setFullname("");
        setTimeout(() => {
          history.push("/login");
        }, 100);
      } else if (response && response.error === 2) {
        setLoading(false);
        toast.warn("Tài khoản đã tồn tại");
      }
    }
  }

  const handleBlur = e => {
    let errors = {};
    const name = e.target.name;
    let check;

    if (name === 'fullname') {
      check = regexName.test(fullname);
      if (!check) {
        errors.fullname = "Vui lòng nhập đúng họ và tên";
      }
    }

    if (name === 'username') {
      check = regexUser.test(username);
      if (!check) {
        errors.username = "Tài khoản từ 6 đến 32 kí tự";
      }
    }

    if (name === 'password') {
      check = regexPass.test(password);
      if (!check) {
        errors.password = "Viết hoa kí tự đầu, mật khẩu từ ít nhất 6 kí tự";
      }
    }

    if (name === 'verifyPassword') {
      if (verifyPassword !== password) {
        errors.verifyPassword = "Mật khẩu xác thực không chính xác";
      }
    }
    setErrors(errors);
  }

  return (
    <>
      {loading && <HanleLoading />}
      <div>
        <div className="resgister">
          <div className="container">
            <div className="resgister-main">
              <h4 className="title">Đăng ký</h4>
              <InputField
                type="text"
                value={fullname}
                placeholder=" "
                name="fullname"
                onChange={e => setFullname(e.target.value)}
                onBlur={handleBlur}
                label="Họ và tên"
              />
              {errors && <p className="error">{errors.fullname}</p>}
              <InputField
                type="text"
                value={username}
                name="username"
                placeholder=" "
                onChange={e => setUsername(e.target.value)}
                onBlur={handleBlur}
                label="Tài khoản"
              />
              {errors && <p className="error">{errors.username}</p>}
              <InputPassword
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={e => setPassword(e.target.value)}
                placeholder=" "
                name="password"
                onBlur={handleBlur}
                showPassword={showPassword}
                onShowPassword={() => setShowPassword(!showPassword)}
                label="Mật khẩu"
              />
              {errors && <p className="error">{errors.password}</p>}
              <InputPassword
                value={verifyPassword}
                type={showPasswordVerify ? "text" : "password"}
                onChange={e => setVerifyPassword(e.target.value)}
                placeholder=" "
                name="verifyPassword"
                onBlur={handleBlur}
                showPassword={showPasswordVerify}
                onShowPassword={() => setShowPasswordVerify(!showPasswordVerify)}
                label="Xác nhận Mật khẩu"
              />
              {errors && <p className="error">{errors.verifyPassword}</p>}
              <button className="btn mt-3" onClick={handleResgister}>Đăng ký</button>
              <div className="resgister-control">
                <Link to="/login" className="register">Bạn đã có tài khoản ?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resgister

