import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { BookPage } from "./book/book-page";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BookPage />
    </ApolloProvider>
  );
};
