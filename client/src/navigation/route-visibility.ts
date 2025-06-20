export const RouteVisibility = {
  ALWAYS: "always" as const,
  AUTH: "auth" as const,
  UNAUTH: "unauth" as const,
};

export type RouteVisibilityType =
  (typeof RouteVisibility)[keyof typeof RouteVisibility];
