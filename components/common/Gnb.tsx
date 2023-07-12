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
    if (router.pathname === "/plan") {
      router.push("/plan/add");
    }
    if (router.pathname === "/schedule") {
      router.push("/schedule/add");
    }
  };

  return (
    <header className="flex fixed top-0 h-40 w-full items-center px-12">
      <button
        className="mr-auto w-20 h-20 flex items-center justify-center"
        onClick={() => router.back()}
      >
        {`<-`}
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        hello world!
      </div>
      {showAddButton && (
        <button
          onClick={handleAddButtonClick}
          className="ml-auto w-32 h-32 flex items-center justify-center"
        >
          Add
        </button>
      )}
    </header>
  );
}
