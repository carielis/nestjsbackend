import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Cookies from "universal-cookie/es6";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(73, 68, 77) ;
    height: 50px;
`

const Linked = styled(Link)`
    margin-left: 50px;
    text-decoration: none;
    color: #e7e7e7;
    align-self: center;
    font-size: 24px;
    font-weight: bold;
    src:local('MyFont'), url(../asset/font/NotoSans) format('otf');
    font-family: MyFont;
`

export const Header = () => {
    const cookie = new Cookies()
    const token = cookie.get('authorization')
    
    return(
       <HeaderContainer>
        {!token ? 
        <>
        <Linked to='/login' >Login</Linked>
        <Linked to='/registration' >Registration</Linked>
        </>
        :
        <>
        <Linked to='/login' onClick={async () =>  {
            await cookie.remove('authorization')
            await window.location.reload()
        }} >Outlogin</Linked>
        <Linked to='/chat' >Chat</Linked>
        </>
     

    }
       </HeaderContainer>
    )
}