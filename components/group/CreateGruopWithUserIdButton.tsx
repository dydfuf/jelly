import { useState } from "react";
import usePutGroup from "hooks/usePutGroup";

export default function CreateGruopWithUserIdButton() {
  const { isLoading: isPutGruopLoading, createGroupWithGroupId } =
    usePutGroup();

  const handleCreateWihtGroupIdButtonClick = (groupId: string) => {
    createGroupWithGroupId(groupId);
  };

  const [input, setInput] = useState("");

  return (
    <>
      <input
        type="text"
        style={{ border: "1px solid" }}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      {isPutGruopLoading && <button disabled>참여중</button>}
      {!isPutGruopLoading && (
        <button onClick={() => handleCreateWihtGroupIdButtonClick(input)}>
          참여하기
        </button>
      )}
    </>
  );
}
