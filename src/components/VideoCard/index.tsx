import PlayIcon from "../../assets/icons/playIcon";
import { fromatDate } from "../../utils";
import { VideoCardPropsType } from "./models";

export default function VideoCard({
  title,
  author,
  release_date,
  id,
  onOpen,
}: VideoCardPropsType) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-20 border-2 rounded-2xl m-10 items-center px-10 cursor-pointer shadow-lg shadow-slate-100">
        <p>{title}</p>
        <p className="border-l-2">{author}</p>
        <p className="border-l-2">{fromatDate(release_date)}</p>
        <div onClick={() => onOpen(id)} className="border-l-2 px-10">
          <PlayIcon />
        </div>
      </div>
    </>
  );
}
