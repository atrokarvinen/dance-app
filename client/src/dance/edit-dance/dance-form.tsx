import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { DanceFormType, DanceFormValues } from "./dance-form-type";
import { ImagePreview } from "./image-preview";
import { preprocessFileList } from "./preprocess-image";
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
  const [preprocessing, setPreprocessing] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      let imageBase64: string | undefined;
      try {
        setPreprocessing(true);
        imageBase64 = await preprocessFileList(data.image);
      } finally {
        setPreprocessing(false);
      }

      const processedData: DanceFormValues = {
        name: data.name,
        imageBase64: imageBase64,
        imageUrl: data.imageUrl,
      };
      onSubmit(processedData);
    })();
  };

  const isEdit = !!defaultValues;
  const title = isEdit ? "Edit dance" : "Create new dance";
  const files = watch("image");
  const fileName = files && files.length > 0 ? files[0].name : undefined;
  const imageUrl = watch("imageUrl");

  const isBusy = preprocessing || submitting;

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
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ alignSelf: "flex-start" }}
            startIcon={<CloudUpload />}
          >
            Upload file
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
            />
          </Button>
          <TextField
            label="File name"
            value={fileName ?? " "}
            disabled
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setValue("image", undefined)}>
                  <Delete />
                </IconButton>
              ),
            }}
          />
          <Divider>Or</Divider>
          <TextField
            label="Image URL"
            variant="outlined"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message ?? " "}
            {...register("imageUrl")}
          />
          <ImagePreview files={files} imageUrl={imageUrl} />
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" disabled={isBusy} onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isBusy}>
              {isBusy ? <CircularProgress size={24} /> : <span>Submit</span>}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
