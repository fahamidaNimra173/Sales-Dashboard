import React from 'react';
import AdminIcon from './adminAvatar';

const NavBar: React.FC = () => {
    return (
        <div className="flex items-center z-50 justify-between px-4 lg:px-20 py-4  w-full fixed bg-black top-0 border-b-4 border-[#a7cc3a] rounded-b-2xl">
            <h1 className="text-[#a7cc3a] uppercase  font-bold text-[20px]">Dashboard</h1>
            {/* user icon at top right corner */}
            <AdminIcon />
        </div>
    );
};

export default NavBar;
