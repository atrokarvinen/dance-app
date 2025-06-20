import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type Props = {
  message: string;
};

export const ErrorPage = ({ message }: Props) => {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">Error</Typography>
      <Typography paragraph>{message}</Typography>
    </Container>
  );
};
