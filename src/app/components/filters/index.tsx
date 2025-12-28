import FilterItem from './filterItem';
import {
  categories,
  priorities,
  statuses,
  sortOptions,
} from '../../constants/filters';
import Block from '../layout/block';
import React, { useCallback } from 'react';
import {
  CategoryFilter,
  PriorityFilter,
  SortOption,
  StatusFilter,
} from '../types/filters';

type FiltersProps = {
  categoryFilter: CategoryFilter;
  setCategoryFilter: (value: CategoryFilter) => void;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (value: PriorityFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

const Filters: React.FC<FiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
}) => {
  const handleSortChange: (value: string) => void = useCallback(
    (value) => {
      setSortOption(value as SortOption);
    },
    [setSortOption]
  );

  return (
    <Block>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterItem
          title="دسته بندی"
          listItems={categories}
          currentValue={categoryFilter}
          onChange={setCategoryFilter}
        />
        <FilterItem
          title="اولویت‌ها"
          listItems={priorities}
          currentValue={priorityFilter}
          onChange={setPriorityFilter}
        />
        <FilterItem
          title="وضعیت"
          listItems={statuses}
          currentValue={statusFilter}
          onChange={setStatusFilter}
        />
        <FilterItem
          title="مرتب سازی"
          listItems={sortOptions}
          currentValue={sortOption}
          onChange={handleSortChange}
        />
      </div>
    </Block>
  );
};

export default React.memo(Filters);
