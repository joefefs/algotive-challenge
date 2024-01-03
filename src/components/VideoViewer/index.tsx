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

    console.log(video);

    return (
      <>
        {open && (
          <div className="fixed w-full h-full bg-slate-300/50 top-0 left-0 flex justify-center items-center">
            <div className="p-10 w-4/5 border-4 bg-white rounded-2xl flex flex-col space-y-4 items-center">
              <button className="self-end" onClick={onClose}>
                <CloseIcon />
              </button>
              <h1 className="self-start">
                {video?.title} - {video?.author}
              </h1>

              <div className="w-full">
                <iframe
                  width={600}
                  height={400}
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
            </div>
          </div>
        )}
      </>
    );
  }
);
