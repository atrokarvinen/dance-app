import { useEffect, useState } from "react";

export enum Page {
  DANCE,
  DANCE_PATTERN,
}

export const usePreferredViewMode = (page: Page) => {
  const getKey = () => {
    switch (page) {
      case Page.DANCE:
        return "ui-dance-view-mode";
      case Page.DANCE_PATTERN:
        return "ui-dance-pattern-view-mode";
      default:
        throw new Error("Invalid page");
    }
  };
  const localStoreKey = getKey();

  const getViewMode = () => {
    return localStorage.getItem(localStoreKey) || "list";
  };

  const [viewMode, setViewMode] = useState(getViewMode());

  useEffect(() => {
    localStorage.setItem(localStoreKey, viewMode);
  }, [viewMode]);

  return { viewMode, setViewMode };
};
