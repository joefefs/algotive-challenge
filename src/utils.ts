export const API_URL = "/api/v1/videos";
import moment from "moment";
import { PaginationType, VideoDto } from "./components/VideoCatalog/models";

export function fromatDate(dateString: string): string {
  const date = new Date(dateString);
  return moment(date).utc().format("MMM Do YYYY");
}

export const PAGINATION_INITIAL_VALUES = {
  count: 0,
  next: null,
  previous: null,
  pages: [],
};

export async function getAllVideos(
  currentPage = 1
): Promise<{ data: VideoDto[]; pagination: PaginationType; error: string }> {
  try {
    const response = await fetch(
      `${API_URL}/${currentPage > 1 ? `?page=${currentPage}` : ""}`
    );
    if (!response.ok)
      return {
        data: [],
        pagination: PAGINATION_INITIAL_VALUES,
        error: `Oops, there was an error: ${response.status} - ${response.statusText}`,
      };
    const result = await response.json();
    const pages = new Array(result.count / result.results.length)
      .fill(null)
      .map((_, index) => index + 1);

    return {
      data: result.results,
      pagination: {
        count: result.count,
        next: result.next ? result.next.split("page=") : null,
        previous: result.previous ? result.previous.split("page=") : 1,
        pages,
      },
      error: "",
    };
  } catch (e) {
    console.log(e);
    return { error: "", data: [], pagination: PAGINATION_INITIAL_VALUES };
  }
}
