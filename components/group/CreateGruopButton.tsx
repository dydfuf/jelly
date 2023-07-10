import usePostgroup from "hooks/usePostGroup";

export default function CreateGruopButton() {
  const { isLoading: isPostGruopLoading, createGroup } = usePostgroup();

  const handleCreateButtonClick = () => {
    createGroup();
  };

  if (isPostGruopLoading) {
    return <button disabled>만드는 중</button>;
  }

  return <button onClick={handleCreateButtonClick}>만들기</button>;
}
