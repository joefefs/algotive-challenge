import PlayIcon from "../../assets/icons/playIcon";
import { fromatDate } from "../../utils";
import { VideoCardPropsType } from "./models";

// Component
export default function VideoCard({ video, onOpen }: VideoCardPropsType) {
  const { title, author, release_date, id, url } = video;

  // Gets the first thumbnail from YT
  const thumbnail = `https://img.youtube.com/vi/${
    url.split("/embed/")[1].split("?")[0]
  }/hqdefault.jpg`;

  return (
    <>
      <div className="card-container">
        <img
          onClick={() => onOpen(id)}
          className="rounded-lg cursor-pointer w-5/6 md:rounded-none md:w-[120px] md:h-[92px]"
          src={thumbnail}
        />
        <div className="w-full">
          <p className="px-4 md:border-r-2">
            <p className="md:hidden text-zinc-400 font-bold">Title</p>
            {title}
          </p>
        </div>
        <div className="w-full">
          <p className="md:hidden text-zinc-400 font-bold">Author</p>
          <p className="px-4 md:border-r-2">{author}</p>
        </div>
        <div className="w-full">
          <p className="md:hidden text-zinc-400 font-bold">Release Date</p>
          <p className="px-4 md:border-r-2">{fromatDate(release_date)}</p>
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
