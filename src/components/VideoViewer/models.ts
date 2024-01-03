import { VideoDto } from "../VideoCatalog/models";

export type VideoViewerPropTypes = {
  onClose: () => void;
};

export type VideoViewerRefType = {
  open: (video: VideoDto) => void;
  close: () => void;
};
