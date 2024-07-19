import { ApiError } from "./models";

export const getErrorMessage = (errors: ApiError[] | null) => {
  if (!errors) {
    return undefined;
  }
  if (errors.length === 0) {
    return undefined;
  }
  const messages = errors.map((error) => error.message);
  const message = messages[0];
  console.log(`Error message: ${message}`);
  return message;
};
