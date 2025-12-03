export type Types = "post" | "note";

export type Items = {
  slug?: string;
  title?: string;
  date?: string | Date;
  description?: string;
  content?: string;
  [key: string]: unknown;
};
