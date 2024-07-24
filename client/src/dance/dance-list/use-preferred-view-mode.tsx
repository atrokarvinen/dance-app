import { useEffect, useState } from "react";

export const usePreferredViewMode = () => {
  const getViewMode = () => {
    return localStorage.getItem("ui-dance-view-mode") || "list";
  };

  const [viewMode, setViewMode] = useState(getViewMode());

  useEffect(() => {
    localStorage.setItem("ui-dance-view-mode", viewMode);
  }, [viewMode]);

  return { viewMode, setViewMode };
};
