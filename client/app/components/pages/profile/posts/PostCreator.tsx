import {
  Button,
  Flex,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { api } from "../../../../store/api/api";
import { CreatePostDto } from "../../../../store/dto/create-post.dto";
import { IUser } from "../../../types/user.interface";

interface Props {
  user: IUser;
}
const PostCreator: FC<Props> = ({ user }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [createPost, {}] = api.useCreatePostMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = useForm<CreatePostDto>({ defaultValues: { description: "" } });

  const pickFile = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // await uploadImageToServer(formData)
  };

  // const uploadImageToServer = async (formData: FormData) => {
  //   await axiosClassic.post(
  //     `/file/upload?userId=${user?.id}&dir=${currentPath}&dirId=${dirId}`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  // };

  const onSubmit: SubmitHandler<CreatePostDto> = async (data, event) => {
    event?.preventDefault();
    createPost({ ...data, userId: user?.id }).unwrap();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={"column"}
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        gap={4}
        rounded={"xl"}
      >
        <Textarea
          id={"description"}
          {...register("description")}
          placeholder="Что у вас нового?"
          size="md"
          rounded={"xl"}
          bg={"transparent"}
          _focus={{ borderColor: useColorModeValue("white", "blue.600") }}
        />
        <Flex direction={"row"} wrap={"wrap"} justify={"space-between"}>
          <Input
            variant={"ghost"}
            ref={fileRef}
            onChange={pickFile}
            type={"file"}
            title={"Загрузить файл"}
            pointerEvents={"none"}
            display={"none"}
          />
          <Button variant={"ghost"} onClick={() => fileRef?.current?.click()}>
            <BsFileEarmarkArrowUp size={28} />
          </Button>

          <Button
            disabled={!isDirty}
            type={"submit"}
            variant={"solid"}
            rounded={"full"}
            bg={"blue.600"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 100 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Опубликовать
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default PostCreator;
