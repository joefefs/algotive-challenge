import { ReactElement, useEffect, useRef, useState } from "react";
import { useLoader } from "../../context";
import ChevronLeft from "../../assets/icons/chevronLeft";
import ChevronRight from "../../assets/icons/chevronRight";
import { getAllVideos, PAGINATION_INITIAL_VALUES } from "../../utils";
import VideoCard from "../VideoCard";
import VideoViewer from "../VideoViewer";
import { VideoViewerRefType } from "../VideoViewer/models";
import { PaginationType, VideoDto } from "./models";

export default function VideoCatalog(): ReactElement {
  const [data, setData] = useState<VideoDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationType>(
    PAGINATION_INITIAL_VALUES
  );

  const { setLoading, setOpenError, setErrorMessage } = useLoader();

  const videoViewer = useRef<VideoViewerRefType>(null);

  useEffect(() => {
    setLoading(true);
    getAllVideos(page)
      .then(({ error, pagination, data }) => {
        if (error) {
          setOpenError(true);
          setErrorMessage(error);
        }
        setData(data);
        setPagination(pagination);
        setLoading(false);
      })
      .catch(() => {
        setOpenError(true);
      });
  }, [page]);

  return (
    <>
      <h1>Video Catalog</h1>
      {data.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onOpen={() => videoViewer.current?.open(video)}
        />
      ))}
      {pagination.pages.length > 1 && (
        <div className="w-100 flex space-x-4 justify-center">
          <button
            disabled={page === 1}
            className="pagination-icons"
            onClick={() => setPage(page - 1)}>
            <ChevronLeft disabled={page === 1} />
          </button>
          {pagination.pages.map((p) => (
            <button
              key={p}
              className={`h-10 border-2 w-10 rounded-full ${
                p === page ? "bg-sky-100	" : ""
              }`}
              onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
          <button
            disabled={!pagination.next}
            className="pagination-icons"
            onClick={() => setPage(page + 1)}>
            <ChevronRight disabled={!pagination.next} />
          </button>
        </div>
      )}
      {!data.length && (
        <p className="text-2xl m-10">Sorry, there are no records</p>
      )}
      <VideoViewer
        onClose={() => videoViewer.current?.close()}
        ref={videoViewer}
      />
    </>
  );
}
