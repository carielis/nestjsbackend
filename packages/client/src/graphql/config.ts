import { ApolloClient,createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie/es6';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  
  
  const cookie = new Cookies()
  const authLink = setContext((_, { headers }) => {
    
   const token = cookie.get('authorization')
   
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      }
    }
  });
  
  
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink) ,
    uri: "http://localhost:4000/graphql",
  
    cache: new InMemoryCache(),
  
    
  })
  