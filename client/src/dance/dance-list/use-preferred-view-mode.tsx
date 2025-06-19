import { useEffect, useState } from "react";

export enum Page {
  DANCE,
  DANCE_PATTERN,
}

const getKey = (page: Page) => {
  switch (page) {
    case Page.DANCE:
      return "ui-dance-view-mode";
    case Page.DANCE_PATTERN:
      return "ui-dance-pattern-view-mode";
    default:
      throw new Error("Invalid page");
  }
};

export const usePreferredViewMode = (page: Page) => {
  const getViewMode = () => {
    const localStoreKey = getKey(page);
    return localStorage.getItem(localStoreKey) || "list";
  };

  const [viewMode, setViewMode] = useState(getViewMode());

  useEffect(() => {
    const localStoreKey = getKey(page);
    localStorage.setItem(localStoreKey, viewMode);
  }, [viewMode, page]);

  return { viewMode, setViewMode };
};
