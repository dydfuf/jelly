import { useSession } from "next-auth/react";
import { PropsWithChildren, useState } from "react";
import useGroup from "hooks/useGroup";

export default function GroupProvider({ children }: PropsWithChildren) {
  const { data } = useSession();
  const userId = data?.user?.id || "";

  const { group, isLoading, createGroup, createGroupWithGroupId, refetch } = useGroup({ userId });

  const handleCreateButtonClick = async () => {
    await createGroup();
  };

  const handleCreateWihtGroupIdButtonClick = async (groupId: string) => {
    const { data } = await createGroupWithGroupId(groupId);
    if (data) {
      refetch();
    }
  };

  // TODO: 컴포넌트로 분리
  const [input, setInput] = useState("");

  if (isLoading) {
    return <div> Group Checking ... </div>;
  }
  // clju93of70006i8wiuta3fm8t
  if (!group) {
    return (
      <div>
        <p>아직 그룹이 없어요</p>
        <p>그룹을 만드시겠어요?</p>
        <button onClick={handleCreateButtonClick}>만들기</button>
        <button
          onClick={() => {
            handleCreateWihtGroupIdButtonClick(input);
          }}
        >
          기존 그룹에 참여하기
        </button>
        <input
          type="text"
          style={{ border: "1px solid" }}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        {isLoading && <div> 만드는중 </div>}
      </div>
    );
  }

  if (group?.count < 2) {
    return (
      <div>
        <p>아직 그룹에 등록한 사람이 없어요.</p>
        <p>그룹 코드를 공유해 참석하라고 하세요.</p>
        <p>본인의 그룹 코드 : {group.userToGroup.groupId}</p>
        <p>상대방의 그룹 코드를 알고 있다면 입력해주세요</p>
        <input type="text" style={{ border: "1px solid" }} />
      </div>
    );
  }

  return <>{children}</>;
}
