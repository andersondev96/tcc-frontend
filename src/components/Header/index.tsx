import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import AvatarImg from '../../assets/avatar.jpg';
import { DropdownMenu } from './DropdownMenu';
import { Item } from './Item';

export const Header: React.FC = () => {

  return (
    <nav className="flex flex-row items-center px-[3.75rem]  bg-blue-400 mobile:hidden">
      <div className="flex flex-row items-center justify-between w-full">
        <ul className="flex flex-row items-center h-[4.125rem]  gap-12">

          <Item title="Home" redirect="/home">
            <AiOutlineHome size={32} color="#FFFFFF" />
          </Item> 

          <Item title="Negócio" redirect="/business">
            <MdOutlineBusinessCenter size={32} color="#FFFFFF" />
          </Item> 

          <Item title="Serviços" redirect="/service">
            <FiShoppingBag size={32} color="#FFFFFF" />
          </Item>
        </ul>

        <DropdownMenu name="João" imageAvatar={AvatarImg} />

      </div>
    </nav>
  )
}