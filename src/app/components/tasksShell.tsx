'use client';
import React, { useMemo, useState } from 'react';
import Search from './search';
import Filters from './filters';
import Overview from './overview';
import TasksList from './tasks';
import { taskList as defaultTasks } from '../../mocks/tasks';
import {
  CategoryFilter,
  PriorityFilter,
  SortOption,
  StatusFilter,
} from './types/filters';
import { TaskItemType } from './types/tasks';
 
 type TasksShellProps = {
   initialTasks?: TaskItemType[];
 };
 
 const normalizeText = (value: string) => value.trim().toLowerCase();
 
 export default function TasksShell({
   initialTasks = defaultTasks,
 }: TasksShellProps) {
   const [searchText, setSearchText] = useState<string>('');
   const [categoryFilter, setCategoryFilter] =
     useState<CategoryFilter>('all');
   const [priorityFilter, setPriorityFilter] =
     useState<PriorityFilter>('all');
   const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
   const [sortOption, setSortOption] = useState<SortOption>('latest');
 
   const filteredTasks = useMemo(() => {
    const normalizedSearch = normalizeText(searchText);
 
     return initialTasks.filter(task => {
       const matchCategory =
         categoryFilter === 'all' || task.category === categoryFilter;
       const matchPriority =
         priorityFilter === 'all' || task.priority === priorityFilter;
       const matchStatus =
         statusFilter === 'all' || task.status === statusFilter;
 
       const matchesText =
         normalizedSearch.length === 0 ||
         [task.title, task.description]
           .map(text => (text || '').toLowerCase())
           .some(text => text.includes(normalizedSearch));
 
       return matchCategory && matchPriority && matchStatus && matchesText;
     });
   }, [categoryFilter, priorityFilter, statusFilter, searchText, initialTasks]);
 
   const sortedTasks = useMemo(() => {
     const copy = [...filteredTasks];
 
     if (sortOption === 'latest') {
       return copy.sort(
         (a, b) =>
           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
       );
     }
 
     if (sortOption === 'oldest') {
       return copy.sort(
         (a, b) =>
           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
       );
     }
 
     return copy;
   }, [filteredTasks, sortOption]);
 
   return (
     <div className="grid gap-4">
       <Filters
         categoryFilter={categoryFilter}
         setCategoryFilter={setCategoryFilter}
         priorityFilter={priorityFilter}
         setPriorityFilter={setPriorityFilter}
         statusFilter={statusFilter}
         setStatusFilter={setStatusFilter}
         sortOption={sortOption}
         setSortOption={setSortOption}
       />
       <Search searchText={searchText} setSearchText={setSearchText} />
       <Overview taskList={sortedTasks} />
       <TasksList taskList={sortedTasks} />
     </div>
   );
 }

