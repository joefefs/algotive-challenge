export const API_URL = "/api/v1/videos";
import moment from "moment";
import { PaginationType, VideoDto } from "./components/VideoCatalog/models";

// Format date (using moment.js) helper
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

type GetVideosResponseType = {
  data: VideoDto[];
  pagination: PaginationType;
  error: string;
};

// Get Paginated list of Videos from the API
export async function getAllVideos(
  currentPage: number = 1
): Promise<GetVideosResponseType> {
  try {
    const response = await fetch(
      `${API_URL}/${currentPage > 1 ? `?page=${currentPage}` : ""}`
    );
    // If error, return error message to display
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

    // Return the list of videos as well as the pagination data
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
    // Returns generic error message for other errors (like in parsing the JSON response)
    return {
      error: "Oops, there was an error!",
      data: [],
      pagination: PAGINATION_INITIAL_VALUES,
    };
  }
}
