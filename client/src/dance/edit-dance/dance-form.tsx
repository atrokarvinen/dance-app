import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { DanceFormType } from "./dance-form-type";

type Props = {
  defaultValues?: DanceFormType;
  onSubmit: (values: DanceFormType) => void;
  submitting: boolean;
};

export const DanceForm = ({ defaultValues, onSubmit, submitting }: Props) => {
  const [name, setName] = useState(defaultValues?.name || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: DanceFormType = { name };
    onSubmit(values);
  };

  const isEdit = !!defaultValues;
  const title = isEdit ? "Edit dance" : "Create new dance";

  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="flex-start" maxWidth="300px">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: "flex-end" }}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : <span>Submit</span>}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
