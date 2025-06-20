import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title: string;
};

export const ConfirmDialog = ({
  open,
  onConfirm,
  onCancel,
  message,
  title,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          {t("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
