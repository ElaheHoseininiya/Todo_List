import React from 'react';
import { ChipProps } from '../types/ui';

const Chip: React.FC<ChipProps> = ({ label, color, textColor }) => {
  if (!label) {
    return null;
  }

  return (
    <div
      className={`rounded-xl py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm ${color} ${textColor}`}
    >
      {label}
    </div>
  );
};

export default React.memo(Chip);
