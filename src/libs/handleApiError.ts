import { toast } from "sonner";

const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return "An error occurred.";
};

export const handleApiError = async (error: any) => {
  console.error(error);
  const errorMessage = await getErrorMessage(error);
  toast.error(errorMessage);
};
