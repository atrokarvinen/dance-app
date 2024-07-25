import { Box } from "@mui/material";

type Props = {
  files: FileList | undefined;
  imageUrl: string | undefined;
};

export const ImagePreview = ({ files, imageUrl }: Props) => {
  const getSource = () => {
    if (files && files[0]) {
      return URL.createObjectURL(files[0]);
    }
    if (imageUrl) return imageUrl;
  };

  const src = getSource();

  if (!src) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={src} height={200} />
    </Box>
  );
};
