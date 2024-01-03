import { ReactElement } from "react";
import { ChevronProps } from "./chevronLeft";

export default function ChevronRight({
  disabled = false,
}: ChevronProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={disabled ? "lightgrey" : "currentColor"}
      className="w-4 h-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
