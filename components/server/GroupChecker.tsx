import { PropsWithChildren } from "react";
import { getCurrentGroup } from "utils/group";

export default async function GroupChecker({ children }: PropsWithChildren) {
  const group = await getCurrentGroup();

  if (!group || group.count < 2) {
    return <div>No gruop</div>;
  }

  return <>{children}</>;
}
