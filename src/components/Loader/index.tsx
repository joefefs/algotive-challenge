import { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import { useLoader } from "../../context";

export default function Loader(): ReactElement {
  const { loading } = useLoader();
  return loading ? (
    <div className="fixed w-full h-full bg-slate-300/50 top-0 left-0 flex justify-center items-center z-50">
      <CircularProgress />
    </div>
  ) : (
    <></>
  );
}
