import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useGetDances } from "./api/use-get-dances";

export const DanceList = () => {
  const location = useLocation();
  const initialScroll = location.state?.danceListScroll;
  const { error, loading, dances } = useGetDances();
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
      <List
        ref={containerRef}
        sx={{ maxHeight: "100%", overflow: "auto" }}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        {dances.map((dance) => (
          <ListItem key={dance.danceId}>
            <Button
              component={Link}
              to={`/dances/${dance.danceId}`}
              state={{ danceListScroll: scrollY }}
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
