import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

export const Loader = () => {
  return (
    <Container
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
