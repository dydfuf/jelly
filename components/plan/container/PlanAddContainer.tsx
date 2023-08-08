import * as Form from "@radix-ui/react-form";
import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Field from "components/common/form/Field";
import usePostPlan, { PostPlanParams } from "hooks/plan/usePostPlan";

export default function PlanAddContainer() {
  const router = useRouter();

  const [isUndecided, setIsUndecided] = useState(false);

  const { createPlan, isLoading } = usePostPlan();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));
    await createPlan({
      ...data,
      ...(data.startDate && { startDate: data.startDate as string }),
      ...(data.endDate && { startDate: data.endDate as string }),
      isUndecided: data.isUndecided === "on",
    } as PostPlanParams);

    router.push("/plan");
  };

  return (
    <div>
      <Form.Root
        className="w-full"
        onSubmit={(event) => {
          handleSubmit(event);
          event.preventDefault();
        }}
        encType="multipart/form-data"
      >
        <Field
          name="title"
          label="제목"
          valueMissingString="제목을 입력해주세요"
        >
          <input
            className="w-full min-w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1 appearance-none"
            required
          />
        </Field>

        <Field name="isUndecided" label="일정 미정?">
          <Switch.Root
            className="w-42 h-25 bg-gray-600 rounded-full relative data-[state='checked']:bg-black"
            id="isUndecided"
            checked={isUndecided}
            onCheckedChange={(checked: boolean) => setIsUndecided(checked)}
          >
            <Switch.Thumb className="block w-21 h-21 bg-white rounded-full data-[state='checked']:translate-x-19 translate-x-2 transition" />
          </Switch.Root>
        </Field>

        {!isUndecided && (
          <>
            <Field
              name="startDate"
              label="시작"
              valueMissingString="시작 시간을 입력해주세요."
            >
              <input
                className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1 appearance-none	"
                type="date"
                required
              />
            </Field>
            <Field
              name="endDate"
              label="종료"
              valueMissingString="종료 시간을 입력해주세요."
            >
              <input
                className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
                type="date"
                required
              />
            </Field>
          </>
        )}

        <Field
          name="content"
          label="내용"
          valueMissingString="내용을 입력해주세요"
        >
          <textarea
            className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
            required
          />
        </Field>

        <Form.Submit asChild>
          <button className="border-1 w-full">
            {isLoading ? "등록중" : "등록하기"}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
