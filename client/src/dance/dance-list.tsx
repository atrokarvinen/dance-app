import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useGetDances } from "./api/use-get-dances";

export const DanceList = () => {
  const { error, loading, dances } = useGetDances();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <Box>
      <Typography component="h1" variant="h3">
        Dances
      </Typography>
      <List>
        {dances.map((dance) => (
          <ListItem key={dance.danceId}>
            <Button
              component={Link}
              to={`/dances/${dance.danceId}`}
              variant="contained"
              sx={{ width: "100%" }}
            >
              {dance.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
