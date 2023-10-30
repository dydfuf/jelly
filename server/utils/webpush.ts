import webpush from "web-push";

webpush.setGCMAPIKey("407433969097");
webpush.setVapidDetails(
  "mailto:88dydfuf@naver.com",
  "BPF6RLD_wSj51GxSQPa4rm4xVCV5Jd45JjVN6CooFFNqEoUOkbfOgTej4Uf1tZHbFkusiflLSP5KH2jVX97383k",
  "fJzg8Ae9EzqgwQgX1GE6_xxfZ1Ksz6RAA9clblDjq1k"
);

export const sendNotification = async ({
  subscription,
  options,
}: {
  subscription: webpush.PushSubscription;
  options: { title: string; body: string; url?: string };
}) => {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: options.title,
        body: options.body,
        url: options.url,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
