import PlayIcon from "../../assets/icons/playIcon";
import { fromatDate } from "../../utils";
import { VideoCardPropsType } from "./models";

export default function VideoCard({ video, onOpen }: VideoCardPropsType) {
  const { title, author, release_date, id, url } = video;

  return (
    <>
      <div className="card-container">
        <img
          onClick={() => onOpen(id)}
          className="rounded-lg md:rounded-none cursor-pointer"
          width={120}
          src={`https://img.youtube.com/vi/${
            url.split("/embed/")[1].split("?")[0]
          }/1.jpg`}
        />
        <div className="w-full">
          <p className="px-4 md:border-r-2 ">{title}</p>
        </div>
        <div className="w-full">
          <p className="px-4 md:border-r-2 ">{author}</p>
        </div>
        <div className="w-full">
          <p className="px-4 md:border-r-2 ">{fromatDate(release_date)}</p>
        </div>
        <button
          onClick={() => onOpen(id)}
          className="flex justify-center items-center md:w-[40px] rounded-full w-[40px] h-[40px]">
          <PlayIcon />
        </button>
      </div>
    </>
  );
}
