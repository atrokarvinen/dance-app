import { isAxiosError } from "axios";

export const useApiError = () => {
  const getError = (error: Error) => {
    const isApiError = isAxiosError(error);
    if (!isApiError) {
      console.error("Not an API error:", error);
      return;
    }

    if (!error.response) {
      console.error("API error without response:", error);
      return;
    }
    const errorData = error.response.data;
    const status = error.response.status;
    const message = error.message || "An error occurred";

    if (status === 400 && typeof errorData === "string") {
      console.error("Bad request:", message);
      return errorData;
    } else if (status === 401) {
      return "Unauthorized access. Please log in again.";
    } else if (status === 403) {
      return "Forbidden access. You do not have permission to perform this action.";
    } else if (status === 404) {
      return "Resource not found. Please check the URL.";
    } else if (status >= 500) {
      return "Server error. Please try again later.";
    }

    return "An unexpected error occurred.";
  };

  return { getError };
};
