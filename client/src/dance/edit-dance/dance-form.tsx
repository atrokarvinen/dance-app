import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { DanceFormType, DanceFormValues } from "./dance-form-type";
import { validationSchema } from "./validation";

type Props = {
  defaultValues?: DanceFormType;
  onCancel: () => void;
  onSubmit: (values: DanceFormValues) => void;
  submitting: boolean;
};

export const DanceForm = ({
  defaultValues,
  onCancel,
  onSubmit,
  submitting,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      const files = data.image as any;
      let imageBase64: string | undefined;
      if (files.length > 0) {
        const file = files[0];
        imageBase64 = await fileToBase64(file);
      }

      const processedData: DanceFormValues = {
        name: data.name,
        imageBase64: imageBase64,
      };
      onSubmit(processedData);
    })();
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result !== "string") {
          resolve("N/A");
          return;
        }
        resolve(reader.result);
      };
      reader.onerror = reject;
    });

  const isEdit = !!defaultValues;
  const title = isEdit ? "Edit dance" : "Create new dance";

  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        {title}
      </Typography>
      <form onSubmit={submitHandler}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message ?? " "}
            {...register("name")}
          />
          <input type="file" accept="image/*" {...register("image")} />
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" disabled={submitting} onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={submitting}>
              {submitting ? (
                <CircularProgress size={24} />
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
