import webpush from "web-push";

webpush.setGCMAPIKey("407433969097");
webpush.setVapidDetails(
  "mailto:88dydfuf@naver.com",
  "BPF6RLD_wSj51GxSQPa4rm4xVCV5Jd45JjVN6CooFFNqEoUOkbfOgTej4Uf1tZHbFkusiflLSP5KH2jVX97383k",
  "fJzg8Ae9EzqgwQgX1GE6_xxfZ1Ksz6RAA9clblDjq1k"
);

export const sendNotification = ({
  subscription,
  options,
}: {
  subscription: webpush.PushSubscription;
  options: { title: string; body: string };
}) => {
  console.log("sendNotification method");
  console.log({ subscription });
  console.log(options);
  console.log(subscription.endpoint);
  const s = webpush.sendNotification(
    subscription,
    JSON.stringify({ title: options, body: options.body })
  );
  console.log({ s });
  console.log("sendNotification end");
};
