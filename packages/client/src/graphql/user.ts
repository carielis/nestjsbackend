import { gql } from '@apollo/client';
export const authorization = gql`
    mutation($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
            username
        }
    }
`

export const registration = gql`
    mutation register($username: String!, $password: String!){
        register(username: $username, password: $password) {
            username
        }
    }
`

export const getMessages = gql`
    query {
        message{
            id
            message
            dateSend
            author {
                username
            }
        }
    }
`

export const sendMessage = gql`
    mutation($message: String!){
        sendMessage(message: $message) {
            message
        }
    }
`

export const getUsers = gql`
    query{
        users{
            username
        }
    }
`