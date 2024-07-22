import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useDeleteDance } from "./api/use-delete-dance";
import { useGetDances } from "./api/use-get-dances";

export const DanceList = () => {
  const location = useLocation();
  const initialScroll = location.state?.danceListScroll;
  const { error, loading, dances } = useGetDances();
  const { deleteDance } = useDeleteDance();
  const [scrollY, setScrollY] = useState(0);
  const containerRef = createRef<HTMLUListElement>();

  useEffect(() => {
    if (!initialScroll) return;
    if (!containerRef.current) return;
    containerRef.current.scrollTo(0, initialScroll);
  }, [containerRef.current, initialScroll]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <Box sx={{ maxHeight: "100%", display: "flex", flexDirection: "column" }}>
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
      <List
        ref={containerRef}
        sx={{ maxHeight: "100%", overflow: "auto" }}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        {dances.map((dance) => (
          <ListItem key={dance.id}>
            <Button
              component={Link}
              to={`/dances/${dance.id}`}
              state={{ danceListScroll: scrollY }}
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
