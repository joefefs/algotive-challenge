import {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import CloseIcon from "../../assets/icons/closeIcon";
import { API_URL, fromatDate } from "../../utils";
import { VideoDto } from "../VideoCatalog/models";
import { VideoViewerPropTypes, VideoViewerRefType } from "./models";

export default forwardRef<VideoViewerRefType, VideoViewerPropTypes>(
  function VideoViewer(
    { onClose }: VideoViewerPropTypes,
    ref: Ref<VideoViewerRefType>
  ): ReactElement {
    const [open, setOpen] = useState(false);
    const [videoData, setVideoData] = useState<VideoDto | null>(null);

    useImperativeHandle(ref, () => ({
      open: async (id) => {
        setOpen(true);

        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        setVideoData(result);
      },
      close: () => {
        setVideoData(null);
        setOpen(false);
      },
    }));

    return (
      <>
        {open && (
          <div className="fixed w-full h-full bg-slate-300/50 top-0 left-0 flex justify-center items-center">
            <div className="p-10 w-4/5 border-4 bg-white rounded-2xl flex flex-col space-y-4 items-center">
              <button className="self-end" onClick={onClose}>
                <CloseIcon />
              </button>
              <h1 className="self-start">
                {videoData?.title} - {videoData?.author}
              </h1>

              <div className="w-full">
                <iframe
                  width={600}
                  height={400}
                  allowFullScreen
                  src={`${videoData?.url}?autoplay=1`}
                />
              </div>
              <div className="self-start text-left">
                <p className="font-bold">Description</p>
                <p>{videoData?.description}</p>
              </div>
              <div className="self-start text-left">
                <p className="font-bold">Released on</p>
                <p>{fromatDate(videoData?.release_date || "")}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
