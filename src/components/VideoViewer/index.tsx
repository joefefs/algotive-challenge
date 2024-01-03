import {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import CloseIcon from "../../assets/icons/closeIcon";
import { fromatDate } from "../../utils";
import { VideoDto } from "../VideoCatalog/models";
import { VideoViewerPropTypes, VideoViewerRefType } from "./models";

export default forwardRef<VideoViewerRefType, VideoViewerPropTypes>(
  function VideoViewer(
    { onClose }: VideoViewerPropTypes,
    ref: Ref<VideoViewerRefType>
  ): ReactElement {
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState<VideoDto | null>(null);

    useImperativeHandle(ref, () => ({
      open: async (videoData) => {
        setOpen(true);
        setVideo(videoData);
      },
      close: () => {
        setVideo(null);
        setOpen(false);
      },
    }));

    return (
      <>
        {open && (
          <div className="fixed w-full h-full bg-slate-300/50 top-0 left-0 flex justify-center items-center">
            <div className="p-10 w-4/5 border-4 bg-white rounded-2xl flex flex-col space-y-4 items-center">
              <button className="self-end rounded-full" onClick={onClose}>
                <CloseIcon />
              </button>
              <h1 className="self-start">
                {video?.title} - {video?.author}
              </h1>

              <div className="w-full pt-[56.25%] h-0 relative">
                <iframe
                  className="absolute left-0 top-0 h-100 w-100"
                  width={"100%"}
                  height={"100%"}
                  allowFullScreen
                  src={`${video?.url}?autoplay=1`}
                />
              </div>
              <div className="self-start text-left">
                <p className="font-bold">Description</p>
                <p>{video?.description}</p>
              </div>
              <div className="self-start text-left">
                <p className="font-bold">Released on</p>
                <p>{fromatDate(video?.release_date || "")}</p>
              </div>
              <button
                onClick={onClose}
                className="self-center w-auto border-2 p-2 rounded-xl bg-sky-100">
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
);
