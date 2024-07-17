import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { DarkModeButton } from "../layout/dark-mode-button";
import { GetDancesResponse } from "./api-models";

const query = gql`
  query GetDances {
    dances {
      danceId
      name
    }
  }
`;

export const DanceList = () => {
  const { loading, error, data } = useQuery<GetDancesResponse>(query);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  const dances = data?.dances ?? [];

  return (
    <div>
      <h1>Dances</h1>
      <DarkModeButton />
      <ul>
        {dances.map((dance) => (
          <li key={dance.danceId}>
            <Link to={`/dances/${dance.danceId}`}>{dance.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
