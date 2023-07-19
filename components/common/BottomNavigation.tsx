import Link from "next/link";

export default function BottomNavigation() {
  return (
    <div className="flex justify-between fixed bottom-0 h-60 w-full">
      <Link
        className="w-full border-1 flex items-center justify-center"
        href={"/memory"}
      >
        memory
      </Link>
      <Link
        className="w-full border-1 flex items-center justify-center"
        href={"/schedule"}
      >
        schedule
      </Link>
      <Link
        className="w-full border-1 flex items-center justify-center"
        href={"/plan"}
      >
        plan
      </Link>

      <Link
        className="w-full border-1 flex items-center justify-center"
        href={"/settings"}
      >
        settings
      </Link>
    </div>
  );
}
