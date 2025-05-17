export type User = {
  username: string;
  password: string;
  role?: string;
};

export const commonUser: User = {
  username: "commonUser",
  password: "commonUser",
};

export const adminUser: User = {
  username: "adminUser",
  password: "adminUser",
  role: "Admin",
};
