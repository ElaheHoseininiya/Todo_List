import { StatusType } from './tasks';
import { SelectItem } from '../../constants/filters';

export type CategoryFilter = 'all' | 'personal' | 'work' | 'fun';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';
export type StatusFilter = StatusType | 'all';
export type SortOption = 'latest' | 'oldest';

export type FilterItemProps = {
  title: string;
  listItems: SelectItem[];
};
