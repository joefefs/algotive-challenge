import { ReactElement, useEffect, useRef, useState } from "react";
import { useLoader } from "../../assets/context";
import ChevronLeft from "../../assets/icons/chevronLeft";
import ChevronRight from "../../assets/icons/chevronRight";
import { API_URL } from "../../utils";
import VideoCard from "../VideoCard";
import VideoViewer from "../VideoViewer";
import { VideoViewerRefType } from "../VideoViewer/models";
import { PaginationType, VideoDto } from "./models";

// TODO - make responsive
export default function VideoCatalog(): ReactElement {
  const [data, setData] = useState<VideoDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    next: null,
    previous: null,
    pages: [],
  });

  const { setLoading, setOpenError, setErrorMessage } = useLoader();

  console.log(data[0]);
  const videoViewer = useRef<VideoViewerRefType>(null);

  async function getAllVideos(currentPage = 1): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/${currentPage > 1 ? `?page=${currentPage}` : ""}`
      );
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        setData(result.results);
        const pages = new Array(result.count / result.results.length)
          .fill(null)
          .map((_, index) => index + 1);
        setPagination({
          count: result.count,
          next: result.next ? result.next.split("page=") : null,
          previous: result.previous ? result.previous.split("page=") : 1,
          pages,
        });
      } else {
        setOpenError(true);
        setErrorMessage(
          `Oops, there was an error: ${response.status} - ${response.statusText}`
        );
      }
    } catch (e) {
      setOpenError(true);
      console.error(e);
    }
    setLoading(false);
  }
  useEffect(() => {
    getAllVideos(page);
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
