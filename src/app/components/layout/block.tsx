import React from 'react';

type BlockProps = {
  children: React.ReactNode;
};

const Block: React.FC<BlockProps> = ({ children }) => {
  return (
    <div className="shadow-md bg-white border border-gray-100 rounded-md p-4">
      {children}
    </div>
  );
};

export default React.memo(Block);