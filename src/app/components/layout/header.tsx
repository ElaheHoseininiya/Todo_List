import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="shadow-md bg-white">
        <div className="container mx-auto py-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Image
                src="/لوگو.png"
                alt="logo"
                width={32}
                height={32}
                sizes="32px"
                priority
              />
              <h1 className="text-lg font-semibold mr-4">مدیریت وظایف من</h1>
            </div>
            <div className="flex items-center">
              <Image
                src="/pic.png"
                alt="User Avatar"
                width={32}
                height={32}
                sizes="32px"
                loading="lazy"
              />
              <span className="mr-2">خوش آمدید!</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);