import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { dummyDances } from "./dummy-data/dances";

const query = gql`
  query GetDances {
    dances {
      danceId
      name
    }
  }
`;

export const DanceList = () => {
  // const { loading, error, data } = useQuery<GetDancesResponse>(query);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :{error.message}</p>;

  const dances = dummyDances;

  return (
    <div>
      <h1>Dances</h1>
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
