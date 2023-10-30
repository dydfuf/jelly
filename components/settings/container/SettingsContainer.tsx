import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function SettingsContainer() {
  const handleSignOut = () => {
    signOut();
  };

  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";

  return (
    <div className="flex flex-col">
      <div className="flex gap-12 h-40">
        <button className="border-1 bg-slate-300 px-8" onClick={handleSignOut}>
          sign out
        </button>
      </div>

      <p>Notification permission : {Notification.permission}</p>
      <button onClick={() => pushManager(userId)}>알림 받기</button>
    </div>
  );
}

const pushManager = async (userId: string) => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    alert(
      "서비스 워커가 등록되어있지 않아 알림을 받을 수 없습니다. 새로고침 후 이용해주세요."
    );
    return;
  }

  if (!registration.pushManager) {
    alert("푸시를 지원하지 않는 브라우저 입니다.");
    return;
  }

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      applicationServerKey:
        "BPF6RLD_wSj51GxSQPa4rm4xVCV5Jd45JjVN6CooFFNqEoUOkbfOgTej4Uf1tZHbFkusiflLSP5KH2jVX97383k",
      userVisibleOnly: true,
    });
  }

  try {
    const response = await fetch(`/api/user/${userId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription }),
    });
    const { message } = (await response.json()) as unknown as {
      message: string;
    };

    alert(message);
  } catch (e) {
    alert("알림 받기에 실패");
  }

  return;
};
