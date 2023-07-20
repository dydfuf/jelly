import * as Form from "@radix-ui/react-form";
import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Field from "components/common/form/Field";
import usePostSchedule, {
  PostScheduleParams,
} from "hooks/schedule/usePostSchedule";
import { RECURRING_TYPE, RecurringType } from "../type";

export default function ScheduleAddContainer() {
  const router = useRouter();

  const [isAllday, setIsAllday] = useState(false);
  const [selectedRecurringType, setSelectedRecurringType] =
    useState<RecurringType>("none");

  const { createSchedule, isLoading } = usePostSchedule();

  const isRecurringTypeNone = selectedRecurringType === "none";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));
    await createSchedule({
      ...data,
      startTime: (data["startTime"] + "Z") as string,
      endTime: data["endTime"] + "Z",
      recurringEndTime: data["recurringEndTime"] + "Z",
      allDay: data["allDay"] === "on",
    } as PostScheduleParams);

    router.push("/schedule");
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
            className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
            required
          />
        </Field>

        <Field name="allDay" label="하루종일?">
          <Switch.Root
            className="w-42 h-25 bg-gray-600 rounded-full relative data-[state='checked']:bg-black"
            id="allDay"
            checked={isAllday}
            onCheckedChange={(checked: boolean) => setIsAllday(checked)}
          >
            <Switch.Thumb className="block w-21 h-21 bg-white rounded-full data-[state='checked']:translate-x-19 translate-x-2 transition" />
          </Switch.Root>
        </Field>

        <Field
          name="startTime"
          label="시작"
          valueMissingString="시작 시간을 입력해주세요."
        >
          <input
            className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
            type={isAllday ? "date" : "datetime-local"}
            required
          />
        </Field>

        <Field
          name="endTime"
          label="종료"
          valueMissingString="종료 시간을 입력해주세요."
        >
          <input
            className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
            type={isAllday ? "date" : "datetime-local"}
            required
          />
        </Field>

        <Field name="recurring" label="반복?">
          <select
            className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
            onChange={(e) => {
              setSelectedRecurringType(e.currentTarget.value as RecurringType);
            }}
          >
            <option value={RECURRING_TYPE.NONE}>안함</option>
            <option value={RECURRING_TYPE.EVERY_DAY}>매일</option>
            <option value={RECURRING_TYPE.EVERY_WEEK}>매주</option>
            <option value={RECURRING_TYPE.EVERY_TWO_WEEK}>2주마다</option>
            <option value={RECURRING_TYPE.EVERY_MONTH}>매월</option>
            <option value={RECURRING_TYPE.EVERY_YEAR}>매년</option>
          </select>
        </Field>

        {!isRecurringTypeNone && (
          <Field
            name="recurringEndTime"
            label="반복 종료"
            valueMissingString="반복 종료 시간을 입력해주세요"
          >
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              type="date"
              required
            />
          </Field>
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
