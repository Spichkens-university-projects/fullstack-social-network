import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { FC, HTMLInputTypeAttribute, PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  fieldName: string;
  errors: FieldError | undefined;
  register: any;
  grouped?: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const ValidationInput: FC<PropsWithChildren<Props>> = ({
  label,
  register,
  fieldName,
  errors,
  type,
  placeholder,
  grouped = false,
  children,
}) => {
  const Group = ({ children }: PropsWithChildren) =>
    grouped ? <InputGroup>{children}</InputGroup> : <>{children}</>;

  return (
    <FormControl isInvalid={Boolean(errors)}>
      <FormLabel>{label}</FormLabel>
      <Group>
        <Input
          id={label}
          type={type}
          placeholder={placeholder}
          {...register(fieldName, {
            required: "Это поле не может быть пустым",
          })}
        />
        {children}
      </Group>
      <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ValidationInput;
