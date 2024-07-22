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
import { DanceFormType } from "./dance-form-type";
import { validationSchema } from "./validation";

type Props = {
  defaultValues?: DanceFormType;
  onCancel: () => void;
  onSubmit: (values: DanceFormType) => void;
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
    handleSubmit(onSubmit)();
  };

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
