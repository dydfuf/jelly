import useGroup from "hooks/useGroup";

interface Props {
  userId: string;
}

export default function GroupContainer({ userId }: Props) {
  const { createGroup, isLoading } = useGroup({ userId });

  const handleCreateButtonClick = async () => {
    const { data } = await createGroup();
    console.log({ data });
  };

  return (
    <div>
      <p>아직 그룹이 없어요</p>
      <p>그룹을 만드시겠어요?</p>
      <button onClick={handleCreateButtonClick}>만들기</button>
      {isLoading && <div> 만드는중 </div>}
    </div>
  );
}
