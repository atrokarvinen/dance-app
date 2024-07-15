type Props = {
  message: string;
};

export const ErrorPage = ({ message }: Props) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
};
