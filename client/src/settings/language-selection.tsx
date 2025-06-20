import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { LANGUAGE_DETECTOR_LOCAL_STORAGE_KEY } from "../i18n/i18n";
import { languageOptions } from "./language-options";

export const LanguageSelection = () => {
  const { t, i18n } = useTranslation();

  const onLanguageChanged = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_DETECTOR_LOCAL_STORAGE_KEY, language);
  };

  return (
    <Select
      label={t("Language")}
      value={i18n.language}
      // style={{ maxWidth: "200px" }}
      data-testid="language-selection"
      onChange={(e) => onLanguageChanged(e.target.value)}
    >
      {languageOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
