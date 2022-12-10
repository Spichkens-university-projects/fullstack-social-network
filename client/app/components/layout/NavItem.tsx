import { Flex, FlexProps, Icon, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { useAuth } from "../../hooks/useAuth";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const { asPath } = useRouter();
  const { user } = useAuth();

  const highlightCurrentPath = () => {
    if (asPath === link) return useColorModeValue("gray.300", "gray.600");
    if (asPath === `/user/${user?.id}` && link.includes("/user"))
      return useColorModeValue("gray.300", "gray.600");
    return undefined;
  };

  return (
    <Link href={link === "/user" ? `/user/${user?.id}` : link}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={highlightCurrentPath()}
        _hover={{
          bg: "blue.600",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
