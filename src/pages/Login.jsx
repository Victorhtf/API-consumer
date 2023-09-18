// import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Formik } from "formik"
import * as Yup from "yup";
import loginbg1 from "../assets/system_pages/login-bg1.jpg"
import loginbg2 from "../assets/system_pages/login-bg2.jpg"
import loginbg3 from "../assets/system_pages/login-bg3.jpg"
import intradataLogo from "../assets/logo/logo-complete.png"
import axios from "axios";
// import { useEffect } from "react";




const Box = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url(${loginbg3});
    background-size: cover;
    `

const FormBox = styled.div `
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
        margin-top: 10px
    }

    .inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }


    .required {
        color: #A10000;
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
    `

const ButtonBox = styled.div `
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

`


function Login() {
    const navigate = useNavigate();



    async function handleSubmit(values) {
        
        try {
            const response = await axios.post('https://localhost:8889/v1/auth/login', {}, {
                auth: {
                    username: values.username,
                    password: values.password
                }
            })
            navigate('/crud');
        } catch (error) {
            alert('Falha na autenticação')
            console.log(error);
        }
    }


    const ValidateSchema = Yup.object().shape({
        username: Yup.string().required("Username is required."),
        password: Yup.string().required("Password is required."),
    })

    return (
        <Box>
            
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={ValidateSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <FormBox>
                        <form onSubmit={handleSubmit} className="form">
                            <div>
                                <img src={intradataLogo} alt={intradataLogo} altColor=""/>
                                <p className="description">Faça login para ter acesso aos recursos!</p>
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
    );}

export default Login