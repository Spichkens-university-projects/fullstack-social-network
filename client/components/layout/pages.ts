import {IconType} from "react-icons";
import {BiMessageSquare, BiPhotoAlbum} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import {TbNews} from "react-icons/tb";

export interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}
export const LinkItems: Array<LinkItemProps> = [
    { name: 'Мой профиль', icon: CgProfile, link: '/profile' },
    { name: 'Новости', icon: TbNews, link: '/' },
    { name: 'Диалоги', icon: BiMessageSquare, link: '/dialogs' },
    { name: 'Фото', icon: BiPhotoAlbum, link: '/photos' },
];