import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { setContext } from "@apollo/client/link/context";

const uri = import.meta.env.VITE_BACKEND_URL as string;
const httpLink = createHttpLink({ uri });

const isDev = import.meta.env.DEV as boolean;
console.log("isDev", isDev);
if (isDev) {
  loadDevMessages();
  loadErrorMessages();
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
