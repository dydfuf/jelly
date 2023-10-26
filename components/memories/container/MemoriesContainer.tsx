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
      <button onClick={notification}>notification</button>
      <p className="text-center">{`총 ${sortedMemories.length}개의 추억`}</p>
      <MemoryList memories={sortedMemories} showDate />
    </div>
  );
}

const pushManager = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    alert("no registration");
    return;
  }

  if (!registration.pushManager) {
    alert("no push manager");
    return;
  }

  let subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    subscription = await registration.pushManager.subscribe({
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

const notification = () => {
  if (!("Notification" in window)) {
    // 브라우저가 Notification API를 지원하는지 확인한다.
    alert("알림을 지원하지 않는 데스크탑 브라우저입니다");
    return;
  }

  if (Notification.permission === "granted") {
    // 이미 알림 권한이 허가됐는지 확인한다.
    // 그렇다면, 알림을 표시한다.
    if ("navigator" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("sw test", {
          body: "helloworld",
          tag: "test!",
        });
      });
      const notification = new Notification("hello world", { body: "hello!" });
      return;
    }
    // const notification = new Notification("안녕하세요!", { body: "body" });
    return;
  }

  // 알림 권한이 거부된 상태는 아니라면
  if (Notification.permission !== "denied") {
    // 사용자에게 알림 권한 승인을 요청한다
    Notification.requestPermission().then((permission) => {
      // 사용자가 승인하면, 알림을 표시한다
      if (permission === "granted") {
        const notification = new Notification("알림이 구독되었습니다");
      }
    });
  }
};
