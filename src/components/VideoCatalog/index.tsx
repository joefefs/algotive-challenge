import { ReactElement, useEffect, useRef, useState } from "react";
import ChevronLeft from "../../assets/icons/chevronLeft";
import ChevronRight from "../../assets/icons/chevronRight";
import { API_URL } from "../../utils";
import VideoCard from "../VideoCard";
import VideoViewer from "../VideoViewer";
import { VideoViewerRefType } from "../VideoViewer/models";
import { PaginationType, VideoDto } from "./models";

export default function VideoCatalog(): ReactElement {
  const [data, setData] = useState<VideoDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    next: null,
    previous: null,
    pages: [],
  });

  const videoViewer = useRef<VideoViewerRefType>(null);

  async function getAllVideos(currentPage = 1): Promise<void> {
    const response = await fetch(
      `${API_URL}/${currentPage > 1 ? `?page=${currentPage}` : ""}`
    );
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
  }
  useEffect(() => {
    getAllVideos(page);
  }, [page]);

  return (
    <>
      {data.map(({ title, author, release_date, id, url }) => (
        <VideoCard
          key={id}
          title={title}
          author={author}
          release_date={release_date}
          id={id}
          url={url}
          onOpen={(videoId) => videoViewer.current?.open(videoId)}
        />
      ))}
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
      <VideoViewer
        onClose={() => videoViewer.current?.close()}
        ref={videoViewer}
      />
    </>
  );
}
