export type VideoDto = {
  created_at: string;
  description: string;
  updated_at: string;
  author: string;
  id: number;
  release_date: string;
  title: string;
  url: string;
};

// export type VideoDto = VideoCardPropsType & {
//   created_at: string;
//   description: string;
//   updated_at: string;
// };

export type PaginationType = {
  count: number;
  next: string | null;
  previous: string | null;
  pages: number[];
};
