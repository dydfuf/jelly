import fs from "fs";

const subscriptions = new Set();

export function saveSubscription(subscription: PushSubscription) {
  const file = fs.readFileSync(`${process.cwd()}/utils/subscriptions.json`);
  const parsed = new Set(JSON.parse(file as any) as Array<any>);
  parsed.add(subscription);

  const result = Array.from(parsed);
  console.log({ result });
  fs.writeFileSync(
    `${process.cwd()}/utils/subscriptions.json`,
    JSON.stringify(result)
  );
  console.log("DB에 저장합니다: ", subscription);
}

export function getSubscriptions() {
  const file = fs.readFileSync(`${process.cwd()}/utils/subscriptions.json`);
  const parsed = new Set(JSON.parse(file as any) as Array<any>);

  console.log("DB를 확인합니다", parsed);

  return Array.from(parsed) as Array<PushSubscription>;
}
