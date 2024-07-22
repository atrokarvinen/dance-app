import { useApolloClient } from "@apollo/client";
import { Button } from "@mui/material";

export const CacheButton = () => {
  const client = useApolloClient();

  const printCache = () => {
    const state = client.cache.extract();
    console.log("Cache state", state);
  };

  return <Button onClick={printCache}>Print cache</Button>;
};
