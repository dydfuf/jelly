import * as Form from "@radix-ui/react-form";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
  name: string;
  label: string;
  valueMissingString?: ReactNode;
}

export default function Field({
  name,
  label,
  valueMissingString,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Form.Field className="grid mb-10" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="leading-35">{label}</Form.Label>
        <Form.Message className="text-12" match="valueMissing">
          {valueMissingString}
        </Form.Message>
      </div>
      <Form.Control asChild>{children}</Form.Control>
    </Form.Field>
  );
}
