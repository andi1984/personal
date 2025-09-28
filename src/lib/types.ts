export type Types = "post" | "note";

export type Items = {
  slug?: string;
  title?: string;
  date?: string;
  description?: string;
  [key: string]: unknown;
};
