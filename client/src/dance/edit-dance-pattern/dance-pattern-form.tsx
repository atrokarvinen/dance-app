import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DancePatternFormType } from "./dance-pattern-form-type";
import { validationSchema } from "./validation";

type Props = {
  defaultValues?: DancePatternFormType;
  onCancel: () => void;
  onSubmit: (values: DancePatternFormType) => void;
  submitting: boolean;
};

export const DancePatternForm = ({
  defaultValues,
  onCancel,
  onSubmit,
  submitting,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const title = defaultValues
    ? "Edit dance pattern"
    : "Create new dance pattern";
  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message ?? " "}
            {...register("name")}
          />
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" onClick={onCancel} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
