import * as Form from "@radix-ui/react-form";

export default function MemoryAddContainer() {
  return (
    <>
      <Form.Root
        className="w-full"
        onSubmit={(event) => {
          const data = Object.fromEntries(new FormData(event.currentTarget));

          console.log({ data });

          event.preventDefault();
        }}
      >
        <Form.Field className="grid mb-10" name="date">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">날짜</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              날짜를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 날짜를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              type="date"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="location">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">장소</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              장소를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 장소를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="photo">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">사진</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              사진을 등록해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">내용</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              내용을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="border-1 w-full">등록하기</button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}
