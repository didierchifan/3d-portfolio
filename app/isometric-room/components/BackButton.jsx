import Back from "../navigation-icons/back.svg";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="./">
      <div
        data-tooltip="Back"
        className="w-12 h-12 fixed top-10 left-8 tooltip-container bg-white hover:bg-orange-500  rounded-md flex items-center justify-center "
      >
        <Back fill="#181818" className="w-8 h-8" />
      </div>
    </Link>
  );
}
