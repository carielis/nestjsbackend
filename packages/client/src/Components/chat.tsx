import { useHistory } from "react-router";
import styled from "styled-components"
import React, { useEffect, useRef } from "react";

import { getMessages, getUsers, sendMessage } from "../graphql/user";
import {  useMutation, useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import Cookies from "universal-cookie/es6";
import get from "lodash/get";

const Container = styled.div`
background-color: rgb(73, 68, 77) ;
flex-direction: row;
position: relative;
align-self: center;
color: #e7e7e7;
display: flex;
height: 600px;
width: 900px;
margin-top: 15vh;
border-radius: 4px;
@media screen and (max-width: 950px) {
  width: 600px;
};
@media screen and (max-width: 580px) {
  width: 320px;
};
@media screen and (max-height: 770px) {
  height: 500px;
};
@media screen and (max-height: 650px) {
  margin-top: 5vh;
};
@media screen and (max-height: 560px) {
  margin-top: 0;
  border-top: 1px solid white;
};

`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  word-break: break-all;
  margin: 20px;
`

const User = styled.div`
  border-bottom: 1px solid black;
  margin: 20px;
  text-align: center;
  justify-self: center;
  :hover {
    transition: all 2s ease-out;
    border-color: #00ccff
  }
  @media screen and (max-width: 950px) {
  width: 100px;
  };
  @media screen and (max-width: 580px) {
  width: 60px;
  };

`

const ScrollContainer = styled.div`
  overflow-y: auto;
  overflow: hidden; 
  word-break: break-all;
  height: 500px;
  :hover {
    overflow: auto;
  }
  @media screen and (max-width: 950px) {
  width: 400px;
  };
  @media screen and (max-width: 580px) {
  width: 160px;
  };
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 20px;
  margin-bottom: 0px;
  flex: 3;
`

const Message = styled.div`
 
  border-top: 1px solid black;
  padding: 10px;
  :hover {
    transition: all 1s ease-in;
    border-color:  #e7e7e7;
    transition: all 1s ease-in-out;
    color: #965096;
  }
`

const FormContainer = styled.div`
  background-color: rgb(44, 41, 46);
  @media screen and (max-width: 950px) {
  width: 390px;
  };
  @media screen and (max-width: 580px) {
  width: 155px;
  };
`

const FormField = styled(Field)`
 outline: none;
 border-radius: 12px;
 margin: 10px;
 width: 600px;
 height: 60px;
 border: 0px;
 padding-left: 10px;
 color:#e7e7e7;
 background-color: rgb(58, 53, 61) ;
 @media screen and (max-width: 950px) {
  width: 355px;
  };
  @media screen and (max-width: 580px) {
  width: 125px;
  };
`
 
export const Chat = () => {
    const {loading: loadMessage, data: message} = useQuery(getMessages, {
        pollInterval: 250,
    }) // <= Query запрос с интервалом 200мс

    const {loading: loadUser, data: users} =  useQuery(getUsers)
    
    const scrolling: any = useRef(null)
    
    
    const [send] = useMutation(sendMessage) 
    // <= Мутация на отправку сообщения
    const history = useHistory()

    const cookie = new Cookies()
 // ================== //
    const usr = get(users, 'users', {})
    const msg = get(message,'message',{})
    const token = cookie.get('authorization')
    const user = cookie.get('username')

    
   
    useEffect(() : any  =>  {
      return scrolling.current.scrollTo(0,scrolling.current.scrollHeight)
    }, [msg]);
   
// Считываем куки, для того чтоб посмотреть какие сообщения мои // 
    return(
      <>
      
      {!token || !user ? history.push('/login') : 
      <Container>
        <UserList>
       {!loadUser && usr.map((item : any, index: any)  => 
         <><User key={index}>{item.username}</User></>
       )}
      </UserList>
      <ChatContainer>
      <ScrollContainer ref={scrolling}>
      {loadMessage ? <>LOADING</> :
            msg.map((item: any) => 
                <Message key={item.id}>     
                    <div>{item.author.username}</div>
                    <div>{item.message}</div>
                </Message >
            )}
            
            </ScrollContainer>
     <FormContainer>
     <Formik 
          initialValues={{message: ''}}
          onSubmit={async (values, actions) => {
            if(!values.message.trim()) {
              console.log('Potom')
            } else {
              await send({variables: {message: values.message}})
              actions.resetForm()
            }
          }}
          >
        <Form 
        style={{
          display: 'flex',
          position: 'relative', 
          height: 80,
          }}>
          <FormField name="message" placeholder='Введите текст' type="text" />
        </Form>
          </Formik>
     </FormContainer>
     </ChatContainer>
  </Container>
      }
      </>
    )
}