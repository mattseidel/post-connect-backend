export interface IPostFilter {
  title?: string;
  user?: string;
  date?: {
    from: Date | null;
    to: Date | null;
  };
  body?: string;
}
