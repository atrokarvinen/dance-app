import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const testQuery = gql`
  query WhoAmI {
    whoAmI {
      name
      userId
    }
  }
`;

export const TestAuthButton = () => {
  const { data, loading, refetch } = useQuery(testQuery);

  useEffect(() => {
    console.log("Loading:", loading);
    printData(data);
  }, [data, loading]);

  const printData = (data: any) => {
    if (!data) {
      console.log("No data");
      return;
    }
    console.log("Name:", data.whoAmI.name);
    console.log("UserId:", data.whoAmI.userId);
  };

  const handleTestAuth = async () => {
    console.log("Refetching");
    const { data } = await refetch();
    printData(data);
  };

  return <button onClick={handleTestAuth}>Test auth</button>;
};
