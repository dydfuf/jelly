import { isBefore } from "date-fns";
import MemoryList from "components/memory/components/MemoryList";
import useGetMemory from "hooks/memory/useGetMemory";

export default function MemoriesContainer() {
  const { memories } = useGetMemory();

  const sortedMemories =
    memories.sort((a, b) => {
      if (isBefore(new Date(b.date), new Date(a.date))) {
        return -1;
      }
      return 0;
    }) || [];

  return (
    <div>
      <button onClick={pushManager}>subscribe</button>
      <p className="text-center">{`총 ${sortedMemories.length}개의 추억`}</p>
      <MemoryList memories={sortedMemories} showDate />
    </div>
  );
}

const pushManager = async () => {
  const registration = await navigator.serviceWorker.getRegistration();

  let subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    subscription = await registration?.pushManager.subscribe({
      applicationServerKey:
        "BPF6RLD_wSj51GxSQPa4rm4xVCV5Jd45JjVN6CooFFNqEoUOkbfOgTej4Uf1tZHbFkusiflLSP5KH2jVX97383k",
      userVisibleOnly: true,
    });
  }

  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription }),
  });

  console.log("postSubscription", { response });

  return;
};
