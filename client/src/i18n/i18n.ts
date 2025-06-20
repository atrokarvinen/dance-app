import i18n from "i18next";
import LanguageDetector, {
  type DetectorOptions,
} from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import fi from "./locales/fi/translation.json";

export const supportedLanguages = ["en", "fi"];
export const LANGUAGE_DETECTOR_LOCAL_STORAGE_KEY = "i18nextLng";

const services = undefined;
const options: DetectorOptions = {
  lookupLocalStorage: LANGUAGE_DETECTOR_LOCAL_STORAGE_KEY,
};
const detector = new LanguageDetector(services, options);

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
    },
    supportedLngs: supportedLanguages,
    interpolation: { escapeValue: false },
  });

export default i18n;
