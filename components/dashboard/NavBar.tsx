import React from 'react';
import AdminIcon from './adminAvatar';

const NavBar: React.FC = () => {
    return (
        <div className="flex items-center z-50 justify-between px-4 lg:px-20 py-4  w-full fixed bg-[#000000] top-0 border-b-4 border-[#f7dc61] rounded-b-sm">
            <h1 className="text-[#f7dc61] font-mono uppercase  font-bold text-[20px]">Dashboard</h1>
            {/* user icon at top right corner */}
            <AdminIcon />
        </div>
    );
};

export default NavBar;
