// import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import loginbg3 from "../assets/system_pages/login-bg3.jpg";
import intradataLogo from "../assets/logo/logo-complete.png";
import axios from "axios";
import { intradataConfig } from "../env";
import { useState } from "react";
import Loading from "../components/Loading/Loading";

//Set up the requisition route.
const baseServiceUrl = `${intradataConfig["protocol"]}://${intradataConfig["url"]}`;
const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${loginbg3});
  background-size: cover;
`;

const FormBox = styled.div`
  background-color: red;
  width: 300px;
  height: 360px;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem 1rem 3rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.36);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  justify-content: space-between;

  .form {
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    padding: 0rem 0px 1rem 0px;
  }

  .description {
    justify-self: center;
    align-self: center;
    display: flex;
    text-align: center;
    margin-top: 10px;
  }

  .inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .required {
    color: #a10000;
    margin-top: 2px;
    margin-bottom: 2px;
    align-self: center;
    font-size: 0.8rem;
  }

  h3 {
    color: #171717;
    font-weight: 700;
    font-size: 20px;
    align-self: center;
  }

  p {
    color: #171717;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    border: none;
    border-radius: 4px;
    height: 25px;
    padding-left: 10px;
    font-size: 12px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  justify-content: flex-end;
  align-items: align-items;
  width: 100%;

  button {
    border: none;
    padding: 0.6rem;
    border-radius: 5px;
    background: linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83));
    color: white;
    font-weight: 500;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: #171717;
      color: white;
      transform: scale(1.05);
      transition: 1s;
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  async function handleMyInformation(token) {
    const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/user/me`;

    const response = await axios.get(finalUrl, {
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

  // Login authentication
  async function handleLogin(values) {
    setTimeout(() => {
      setRemoveLoading(true);
      console.log("Loading ok");
    }, 3000);

    const finalUrl = `${baseServiceUrl}:${intradataConfig["port"]}/${intradataConfig["basePath"]}/auth/login`;
    try {
      const response = await axios.post(
        finalUrl,
        {},
        {
          auth: {
            username: values.username,
            password: values.password,
          },
        }
      );

      const { user, refresh_token } = await handleMyInformation(
        response.data.token
      );

      for (const key in user) {
        sessionStorage.setItem(key, JSON.stringify(user[key]));
      }

      sessionStorage.setItem("token", refresh_token);

      const userPermissions = sessionStorage.getItem("permissions");

      if (userPermissions === '["ALL"]') {
        navigate("/crud");
        alert("Usuário logado");
      } else {
        alert("You must be logged in");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Set the schema to validate form
  const ValidateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
  });

  const [removeLoading, setRemoveLoading] = useState(true);

  return (
    <Box>
      {!removeLoading && <Loading />}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={ValidateSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <FormBox>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <img src={intradataLogo} />
                <p className="description">
                  Faça login para ter acesso aos recursos!
                </p>
              </div>

              <div className="inputs">
                <div className="username">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="required">
                    {errors.username && errors.username}
                  </p>
                </div>
                <div className="password">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="required">
                    {errors.password && errors.password}
                  </p>
                </div>
              </div>
              <ButtonBox>
                <button type="submit">Login</button>
                <button>Cadastre-se</button>
              </ButtonBox>
            </form>
          </FormBox>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
