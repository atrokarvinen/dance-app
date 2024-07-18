import { Container, Typography } from "@mui/material";

type Props = {
  message: string;
};

export const ErrorPage = ({ message }: Props) => {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">Error</Typography>
      <Typography variant="body1">{message}</Typography>
    </Container>
  );
};
