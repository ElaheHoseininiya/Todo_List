'use client';
import React, { useMemo, useState } from 'react';
import { getDateTimestamp } from '../../utils/date';
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

const normalizeText: (value: string) => string = (value) =>
  value.trim().toLowerCase();

const TasksShell: React.FC<TasksShellProps> = ({
  initialTasks = defaultTasks,
}) => {
  const [tasks, setTasks] = useState<TaskItemType[]>(initialTasks);
  const [searchText, setSearchText] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  };

  const filteredTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return [];
    }

    try {
      const normalizedSearch = normalizeText(searchText);

      return tasks.filter((task) => {
        const matchCategory =
          categoryFilter === 'all' || task.category === categoryFilter;
        const matchPriority =
          priorityFilter === 'all' || task.priority === priorityFilter;
        const matchStatus =
          statusFilter === 'all' || task.status === statusFilter;

        const matchesText =
          normalizedSearch.length === 0 ||
          [task.title, task.description]
            .map((text) => (text || '').toLowerCase())
            .some((text) => text.includes(normalizedSearch));

        return matchCategory && matchPriority && matchStatus && matchesText;
      });
    } catch (error) {
      console.error('Error filtering tasks:', error);
      return [];
    }
  }, [categoryFilter, priorityFilter, statusFilter, searchText, tasks]);

  const sortedTasks = useMemo(() => {
    try {
      const copy = [...filteredTasks];

      if (sortOption === 'latest') {
        return copy.sort(
          (a, b) =>
            getDateTimestamp(b.createdAt) - getDateTimestamp(a.createdAt)
        );
      }

      if (sortOption === 'oldest') {
        return copy.sort(
          (a, b) =>
            getDateTimestamp(a.createdAt) - getDateTimestamp(b.createdAt)
        );
      }

      return copy;
    } catch (error) {
      console.error('Error sorting tasks:', error);
      return filteredTasks;
    }
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
      <TasksList taskList={sortedTasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default TasksShell;
