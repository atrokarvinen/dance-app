import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Video } from "../dance-pattern-details/video";
import type { DancePatternFormType } from "./dance-pattern-form-type";
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
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const title = defaultValues
    ? t("Edit dance pattern")
    : t("Create new dance pattern");
  const videoUrl = watch("videoUrl");
  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("Name")}
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message ?? " "}
            {...register("name")}
          />
          <TextField
            label={t("Description")}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description?.message ?? " "}
            {...register("description")}
          />
          <TextField
            label={t("Video URL")}
            variant="outlined"
            error={!!errors.videoUrl}
            helperText={errors.videoUrl?.message ?? " "}
            {...register("videoUrl")}
          />
          {videoUrl && (
            <Box mb={2}>
              <Typography>{t("Video preview")}</Typography>
              <Video url={videoUrl} />
            </Box>
          )}
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" onClick={onCancel} disabled={submitting}>
              {t("Cancel")}
            </Button>
            <Button variant="contained" type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : t("Submit")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
