import React, { useCallback } from 'react';
import { SelectItem } from '../../constants/filters';

export type FilterItemProps = {
  title: string;
  listItems: SelectItem[];
  currentValue: string | null;
  onChange: (value: string) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({
  title,
  listItems,
  currentValue,
  onChange,
}) => {
  const handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  if (!listItems || listItems.length === 0) {
    return null;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <select
        className="block w-full border border-gray-300 rounded-md p-2"
        value={currentValue ?? 'all'}
        onChange={handleChange}
      >
        {listItems.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(FilterItem);
