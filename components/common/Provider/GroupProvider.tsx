import { PropsWithChildren } from "react";
import NoGroup from "components/group/NoGroup";
import useGetGroup from "hooks/useGetGroup";

export default function GroupProvider({ children }: PropsWithChildren) {
  const { isLoading: isGetGruopLoading, data: group } = useGetGroup();

  if (isGetGruopLoading) {
    return <div> Group Checking ... </div>;
  }

  if (!group || group?.count < 2) {
    return <NoGroup group={group} />;
  }

  return <>{children}</>;
}
