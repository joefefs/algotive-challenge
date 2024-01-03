import { VideoCardPropsType } from "../VideoCard/models";

export type VideoDto = VideoCardPropsType & {
  created_at: string;
  description: string;
  updated_at: string;
};

export type PaginationType = {
  count: number;
  next: string | null;
  previous: string | null;
  pages: number[];
};
