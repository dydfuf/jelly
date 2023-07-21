import { ArrowLeftIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

export default function Gnb() {
  const router = useRouter();

  const showAddButton = ["/memory", "/plan", "/schedule"].includes(
    router.pathname
  );

  const handleAddButtonClick = () => {
    if (router.pathname === "/memory") {
      router.push("/memory/add");
    }
    if (router.pathname === "/schedule") {
      router.push("/schedule/add");
    }
    if (router.pathname === "/plan") {
      router.push("/plan/add");
    }
  };

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/memory":
        return "추억";
      case "/memory/add":
        return "추억 추가하기";
      case "/schedule":
        return "일정";
      case "/schedule/add":
        return "일정 추가하기";
      case "/plan":
        return "계획";
      case "/plan/add":
        return "계획 추가하기";
      case "/settings":
        return "설정";
      default:
        return "쿠키젤리";
    }
  };

  return (
    <header className="flex fixed top-0 h-60 w-full items-center px-12 border-b-1">
      <button
        className="mr-auto w-20 h-20 flex items-center justify-center"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon width={30} height={30} />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-18 tracking-widest font-semibold">
        {getTitle(router.pathname)}
      </div>
      {showAddButton && (
        <button
          onClick={handleAddButtonClick}
          className="ml-auto w-32 h-32 flex items-center justify-center"
        >
          <PlusCircledIcon width={25} height={25} />
        </button>
      )}
    </header>
  );
}
