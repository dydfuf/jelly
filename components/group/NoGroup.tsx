"user client";

import CreateGruopButton from "./CreateGruopButton";
import CreateGruopWithUserIdButton from "./CreateGruopWithUserIdButton";

interface Props {
  group?: Group;
}

export default function NoGroup({ group }: Props) {
  return (
    <div>
      {!group && (
        <>
          <p>아직 그룹이 없어요</p>
          <p>그룹을 만드시겠어요?</p>
        </>
      )}
      {group && group?.count < 2 && (
        <>
          <p>아직 그룹에 등록한 사람이 없어요.</p>
          <p>그룹 코드를 공유해 참석하라고 하세요.</p>
          <p>본인의 그룹 코드 : {group?.userToGroup.groupId}</p>
        </>
      )}
      {!group && (
        <div>
          <CreateGruopButton />
        </div>
      )}

      <div>
        <CreateGruopWithUserIdButton />
      </div>
    </div>
  );
}

interface Group {
  userToGroup: {
    id: string;
    userId: string;
    groupId: string;
  };
  count: number;
}
