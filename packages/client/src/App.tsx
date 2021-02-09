import React from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';

import {  ApolloProvider} from '@apollo/client';
import { client } from './graphql/config';

import { Auth } from './Components/auth';
import { Header } from './Components/header';
import { Reg } from './Components/registration';
import { Chat } from './Components/chat';
 



const SafeArea = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url( "https://clck.ru/T3Xok") ;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: auto;
`



function App() {

  return (
    <ApolloProvider client={client}>
      <SafeArea>
      <Header />
      
      <Route  path='/login' component={Auth} />
      <Route  path='/registration' component={Reg} />
      <Route  path='/chat' component={Chat} />
      </SafeArea>
    </ApolloProvider>
  );
}

export default App;
