import { StateProvider } from "../store.js";

import { ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import "../styles/locomotive-scroll.css";
import "../styles/mathsquill.css";

import Layout from "../components/Layout";

/* 

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

*/

const httpLink = createHttpLink({
  uri: "https://mezcla-back.herokuapp.com/",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </StateProvider>
  );
}
