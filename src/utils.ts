export const API_URL = "/api/v1/videos";
import moment from "moment";

export function fromatDate(dateString: string): string {
  const date = new Date(dateString);
  return moment(date).utc().format("MMM Do YYYY");
}
