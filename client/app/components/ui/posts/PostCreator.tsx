import {
  Box,
  Button,
  Flex,
  Input,
  Progress,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { useAuth } from "../../../hooks/useAuth";
import {
  deleteMediaFromServer,
  uploadFile,
} from "../../../services/file-upload.service";
import { postApi } from "../../../store/api/post-api";
import { CreatePostDto } from "../../../store/dto/create-post.dto";
import { IUser } from "../../types/user.interface";
import DeleteButton from "../DeleteButton";

interface Props {
  user: IUser | undefined;
}
const PostCreator: FC<Props> = ({ user }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { accessToken } = useAuth();
  const [imageUploadingProgress, setImageUploadingProgress] =
    useState<number>(0);
  const [imageToUpload, setImageToUpload] = useState<string>("");

  const [createPost, {}] = postApi.useCreatePostMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = useForm<CreatePostDto>({
    defaultValues: { description: "", mediaPath: "" },
  });

  const onUpload = async (selectedFiles: FileList | null) => {
    const staticPath = await uploadFile(
      selectedFiles,
      user,
      accessToken,
      setImageUploadingProgress,
      setImageToUpload
    );
    setValue("mediaPath", staticPath);
  };
  const onSubmit: SubmitHandler<CreatePostDto> = async (data, event) => {
    event?.preventDefault();
    createPost({ ...data, userId: user?.id }).unwrap();
    reset();
    setImageToUpload(() => "");
  };

  const onDeleteMedia = async () => {
    await deleteMediaFromServer(user, accessToken, imageToUpload);
    setImageToUpload(() => "");
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
          <Flex alignItems={"center"}>
            <Input
              variant={"ghost"}
              ref={fileRef}
              onChange={async (event) => {
                await onUpload(event.target.files);
                event.target.files = null;
              }}
              type={"file"}
              title={"Загрузить файл"}
              pointerEvents={"none"}
              display={"none"}
            />
            <Button variant={"ghost"} onClick={() => fileRef?.current?.click()}>
              <BsFileEarmarkArrowUp size={28} />
            </Button>
            <Box dir={"column"}>
              {imageUploadingProgress > 0 && imageUploadingProgress < 100 ? (
                <Progress
                  hasStripe
                  value={imageUploadingProgress}
                  w={"200px"}
                />
              ) : null}
              {imageToUpload ? (
                <Flex direction={"row"} alignItems={"center"}>
                  <Text>{imageToUpload}</Text>
                  <DeleteButton onClick={onDeleteMedia} />
                </Flex>
              ) : null}
            </Box>
          </Flex>

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
