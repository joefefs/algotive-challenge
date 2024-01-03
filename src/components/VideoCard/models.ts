import { VideoDto } from "../VideoCatalog/models";

export type VideoCardPropsType = {
  video: VideoDto;
  onOpen: (id: number) => void;
};
