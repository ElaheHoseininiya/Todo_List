import React from 'react';
import { colorClasses } from '../../constants/colors';
import { NumberBlockProps } from '../types/overview';

const NumberBlock: React.FC<NumberBlockProps> = ({ number, title, color }) => {
  const colorClass = colorClasses[color] || 'text-gray-500';

  return (
    <div className="text-center">
      <h2 className={`text-2xl font-bold ${colorClass}`}>{number}</h2>
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default React.memo(NumberBlock);
