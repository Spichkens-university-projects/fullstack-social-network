import { IconType } from "react-icons";
import { BiMessageSquare, BiPhotoAlbum } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdPeopleOutline } from "react-icons/md";
import { TbNews } from "react-icons/tb";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
export const LinkItems: LinkItemProps[] = [
  { name: "Мой профиль", icon: CgProfile, link: "/user" },
  { name: "Новости", icon: TbNews, link: "/" },
  { name: "Друзья", icon: MdPeopleOutline, link: "/friends" },
  { name: "Диалоги", icon: BiMessageSquare, link: "/dialogs" },
  { name: "Фото", icon: BiPhotoAlbum, link: "/photos" },
];
