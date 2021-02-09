import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React from "react"
import { useHistory } from "react-router";
import styled from "styled-components"
import Cookies from "universal-cookie/es6";

import { authorization } from "../graphql/user";


const Container = styled.div`
box-shadow:1px 1px 100px 1px rgba(255,255,255,1);
background-color: rgb(73, 68, 77) ;
flex-direction: column;
align-self: center;
color: #e7e7e7;
display: flex;
height: 500px;
width: 500px;
margin-top: 20vh;
border-radius: 4px;
`;

const Title = styled.div`
    font-weight: bold;
    text-align: center;
    padding: 20px;
`

const FormContainer = styled.div`
display: flex;
position: relative;
flex-direction: row;
justify-content: center;
height: 100%;
`

const InputField = styled(Field)`
    background-color: rgb(73, 68, 77) ;
    border: none;
    border-bottom: 1px solid #d1d1d1;
    padding-left: 5px;
    color: #e7e7e7;
    outline: none;
    margin: 20px;
    height: 30px;   
    width: 130px;
    ::placeholder {
        color: rgba(231, 231, 231, 0.767);
    }
    :hover {
        ::placeholder {
            transition: all 0.5s ease-out;
        color: rgba(255, 255, 255, 0.87);
    }
    }
    :focus {
        transition: all 0.5s ease-out;
        border-bottom: 1px solid #e7ffcc;
        border-radius: 5px;
        ::placeholder {
            transition: all 0.5s ease-out;
        color: #e7ffcc;
        }
    }
`

const ButtonSubmit = styled.button`
    text-decoration: none;
    display: inline-block;
    width: 140px;
    height: 45px;
    line-height: 45px;
    border-radius: 45px;
    border: none;
    outline: none;
    margin: 40px 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3px;
    font-weight: 600;
    color: #524f4e;
    background: white;
    box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
    transition: .3s;
  :hover {
    background: #2EE59D;
    box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
    color: white;
    transform: translateY(-7px);
  }
`
 
export const Auth = () => {
    const cookies = new Cookies();

    const [login] = useMutation(authorization)
    const history = useHistory()

    return(
        <Container>
        <Title>Authorization</Title>
        <hr style={{width: "99%"}} />
      
      <FormContainer>
          <Formik
              initialValues={{username: '', password: ''}}
              onSubmit={async (values) => {
                  const {data} = await login({variables: {username: values.username, password: values.password}})
                  if (data.register === null) {
                      alert('Проверьте правильность ввода данных')
                  }
                  if(data.register !== null) {
                      await setTimeout(async () => {
                        await cookies.set('authorization', data.login.token)
                        await cookies.set('username', data.login.username)
                        await history.push('/chat')
                        await window.location.reload()
                  }, 0)
              }
          }}>
              <Form>
                  <div style={{position: 'relative'}}>
                  <InputField 
                      style={{
                      width: 160
                      }}
                      type="text"
                      placeholder="Login" 
                      name="username" 
                       />
                  </div>
                  <div style={{position: 'relative'}}>
                  <InputField 
                      style={{
                      paddingRight: 30 
                      }}
                      type="password"
                      placeholder="Password"
                      name="password" />
                
                  </div>
                  <ButtonSubmit>ВОЙТИ</ButtonSubmit>
              </Form>
          </Formik>
      </FormContainer>
    </Container>
    )
}
