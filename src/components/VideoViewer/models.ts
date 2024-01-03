export type VideoViewerPropTypes = {
  onClose: () => void;
};

export type VideoViewerRefType = {
  open: (id: number) => void;
  close: () => void;
};
