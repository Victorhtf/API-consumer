//React
import { useState, useEffect } from "react";

//Libs
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";

//Components
import Loading from "../components/Loading/Loading";

//Dependencies
import { routes } from "../routes/routes";

//Assets
import loginbg1 from "../assets/system_pages/login-bg1.jpg";
import loginbg2 from "../assets/system_pages/login-bg2.jpg";
import loginbg3 from "../assets/system_pages/login-bg3.jpg";
import intradataLogo from "../assets/logo/logo-complete.png";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
`;

const FormBox = styled.div`
  width: 375px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 3.75rem 1.25rem 3.75rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.36);
  border-radius: 20px;
  box-shadow: 0 5px 37.5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);
  border: 1.25px solid rgba(255, 255, 255, 0.3);
  justify-content: space-between;
  position: relative;

  .form {
    flex: 1;
    flex-direction: column;
    display: flex;
    padding: 0rem 0px 1.25rem 0px;
  }

  .description {
    justify-self: center;
    align-self: center;
    display: flex;
    text-align: center;
    margin-top: 12.5px;
  }

  .inputs {
    margin-top: 10.5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8.75px;
  }
  input:focus {
    box-sizing: inherit;
    outline: 2.5px solid #81008f;
  }

  .password-input {
    display: flex;
    align-items: center;
    position: relative;
  }

  .password-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 31.25px;
    position: absolute;
    right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #182136;
  }

  .required {
    display: flex;
    color: #810101;
    margin-top: 7.5px;
    margin-bottom: 2.5px;
    align-self: center;
    font-size: 0.875rem;
  }

  h3 {
    color: #171717;
    font-weight: 875;
    font-size: 25px;
    align-self: center;
  }

  p {
    color: #171717;
    font-weight: 625;
    font-size: 17.5px;
    margin-bottom: 6.25px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 31.25px;
    padding-left: 12.5px;
    font-size: 15px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25px;

  button {
    width: 80%;
    border: none;
    padding: 0.75rem;
    border-radius: 6.25px;
    background: linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83));
    color: white;
    font-weight: 625;
    cursor: pointer;
    font-size: 15px;
    height: 43.75px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #171717;
      color: white;
      transform: scale(1.05);
      transition: 1s;
    }
  }
`;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [background, setBackground] = useState([loginbg1]);

  const navigate = useNavigate();
  const loginRoutes = routes.login;

  function getRandomWallpaper() {
    const backgroundsList = [loginbg1, loginbg2, loginbg3];
    const randomIndex = Math.floor(Math.random() * backgroundsList.length);
    return backgroundsList[randomIndex];
  }

  async function handleMyInformation(token) {
    const response = await axios.get(loginRoutes.me, {
      headers: {
        auth: token,
      },
    });

    if (response.data !== undefined) {
      const user = {
        id: response.data.user_id,
        name: response.data.username,
        roles: response.data.roles,
        permissions: response.data.permissions,
        meta_integrations: response.data.meta_integrations,
      };

      const refresh_token = response.headers.token;

      return { user, refresh_token };
    } else {
      return { user: undefined, refresh_token: undefined };
    }
  }
  const [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    setLoading(true);

    try {
      const response = await axios.post(
        loginRoutes.auth,
        {},
        {
          auth: {
            username: values.username,
            password: values.password,
          },
        }
      );

      const { user, refresh_token } = await handleMyInformation(response.data.token);

      for (const key in user) {
        sessionStorage.setItem(key, JSON.stringify(user[key]));
      }

      sessionStorage.setItem("token", refresh_token);

      const userPermissions = sessionStorage.getItem("permissions");

      if (userPermissions.includes("ALL")) {
        navigate("/crud");
        toast.success("Login realizado com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn("401 - Unauthorized");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Ops, algo deu errado. Tente novamente mais tarde.");
      setLoading(false);
    }
  }

  const ValidateSchema = Yup.object().shape({
    username: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  useEffect(() => {
    setBackground(getRandomWallpaper([loginbg1, loginbg2, loginbg3]));
  }, []);

  return (
    <Box>
      <div
        style={{
          backgroundSize: "cover",
          filter: "brightness(70%)",
          backgroundImage: `url(${background})`,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></div>
      <Formik initialValues={{ username: "", password: "" }} validationSchema={ValidateSchema} onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <div>
            <FormBox>
              <form onSubmit={handleSubmit} className="form">
                <div>
                  <img src={intradataLogo} />
                  <p className="description">Faça login para ter acesso aos recursos!</p>
                </div>

                <div className="inputs">
                  <div className="username">
                    <input type="text" id="username" placeholder="Username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                    <p className="required">{touched.username && errors.username && errors.username}</p>
                  </div>
                  <div className="password">
                    <div className="password-input">
                      <input
                        id="password"
                        type={!showPassword ? "password" : "text"}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        style={{ cursor: "pointer" }}
                        className="password-icon"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {!showPassword ? <LuEye style={{ color: "white", fontSize: "12px" }} /> : <LuEyeOff style={{ color: "white", fontSize: "12px" }} />}
                      </div>
                    </div>
                    <p className="required">{errors.password && errors.password}</p>
                  </div>
                </div>

                <ButtonBox>
                  <button type="submit">{loading ? <Loading /> : "Login"}</button>
                </ButtonBox>
              </form>
            </FormBox>
          </div>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
