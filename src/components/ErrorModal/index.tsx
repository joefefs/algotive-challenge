import { ReactElement } from "react";
import { useLoader } from "../../context";
import WarningIcon from "../../assets/icons/warningIcon";

export default function ErrorModal(): ReactElement {
  const { errorMessage, openError, setOpenError } = useLoader();

  return openError ? (
    <>
      <div className="fixed w-full h-full bg-slate-300/50 top-0 left-0 flex justify-center items-center z-40">
        <div className="bg-white p-12 rounded-2xl flex flex-col space-y-10 items-center">
          <WarningIcon />
          <p className="text-lg font-bold text-red-800">
            {errorMessage || "Oops, there was an error"}
          </p>
          <button
            className="self-center w-auto border-2 p-2 rounded-xl bg-sky-100"
            onClick={() => setOpenError(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
