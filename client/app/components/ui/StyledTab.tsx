import { Circle, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Tab } from "@chakra-ui/tabs";
import { FC, PropsWithChildren } from "react";

interface Props {
  title?: string;
}

const StyledTab: FC<PropsWithChildren<Props>> = ({ children, title }) => (
  <Tab _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
    <Flex gap={2} alignItems={"center"}>
      <Text>{title}</Text>
      {children ? (
        <Circle size={"20px"} bg={"blue.600"} color={"white"} fontSize={"16px"}>
          {children}
        </Circle>
      ) : null}
    </Flex>
  </Tab>
);
export default StyledTab;
