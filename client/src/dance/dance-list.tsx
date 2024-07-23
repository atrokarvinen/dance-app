import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useDeleteDance } from "./api/use-delete-dance";
import { useGetDances } from "./api/use-get-dances";

export const DanceList = () => {
  const { error, loading, dances } = useGetDances();
  const { deleteDance } = useDeleteDance();

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <Box>
      <Typography component="h1" variant="h3">
        Dances
      </Typography>
      <Button
        variant="contained"
        to={"/dances/new"}
        component={Link}
        sx={{ alignSelf: "flex-end" }}
      >
        + Add new
      </Button>
      <List>
        {dances.map((dance) => (
          <ListItem key={dance.id}>
            <Button
              component={Link}
              to={`/dances/${dance.id}`}
              variant="contained"
              sx={{ width: "100%" }}
            >
              {dance.name}
            </Button>
            <IconButton to={`/dances/edit/${dance.id}`} component={Link}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => deleteDance(dance.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
