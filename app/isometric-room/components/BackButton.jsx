import Back from "../navigation-icons/back.svg";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="./">
      <div
        data-tooltip="Back"
        className="w-12 h-12 fixed top-10 left-8 tooltip-container hover:bg-orange-600  rounded-md flex items-center justify-center "
      >
        <Back fill="#F5F5F7" className="w-8 h-8" />
      </div>
    </Link>
  );
}
