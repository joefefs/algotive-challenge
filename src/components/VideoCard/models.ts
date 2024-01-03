export type VideoCardPropsType = {
  author: string;
  id: number;
  release_date: string;
  title: string;
  url: string;
  onOpen: (id: number) => void;
};
