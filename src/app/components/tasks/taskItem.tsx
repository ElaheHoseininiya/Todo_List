import React, { useMemo } from 'react';
import Block from '../layout/block';
import Chip from '../ui/chip';

import { priorityChip, statusChip } from '../../constants/tasks';
import {
  FolderIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { TaskItemType } from '../types/tasks';

const TaskItem: React.FC<TaskItemType> = ({
  taskId,
  title,
  description,
  dueDate,
  createdAt,
  priority,
  status,
  category,
}) => {
  const priorityTag = useMemo(() => priorityChip[priority] || {}, [priority]);
  const statusTag = useMemo(() => statusChip[status] || {}, [status]);

  const formatDate: (value: Date | string) => string = (value) => {
    try {
      if (!value) {
        return 'نامشخص';
      }

      const parsed = value instanceof Date ? value : new Date(value);

      if (Number.isNaN(parsed.getTime())) {
        return 'نامشخص';
      }

      return parsed.toLocaleDateString('fa-IR');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'نامشخص';
    }
  };

  const formattedDueDate = useMemo(() => formatDate(dueDate), [dueDate]);
  const formattedCreatedDate = useMemo(() => formatDate(createdAt), [createdAt]);

  return (
    <Block>
      <div className="flex justify-between">
        <div className="flex gap-2 mb-2">
          <h3 className="font-bold">{title}</h3>
          {priorityTag.label && (
            <Chip
              label={priorityTag.label}
              color={priorityTag.color}
              textColor={priorityTag.textColor}
            />
          )}
          {statusTag.label && (
            <Chip
              label={statusTag.label}
              color={statusTag.color}
              textColor={statusTag.textColor}
            />
          )}
        </div>
        <div className="flex">
          <PencilSquareIcon className="h-5 w-5 text-gray-500 mx-2" />
          <TrashIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <p className="mb-2">{description}</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex">
          <FolderIcon className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600 mx-2">{category}</span>
        </div>
        <div className="flex">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600 mx-2">{formattedDueDate}</span>
        </div>
        <div className="flex">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600 mx-2">{formattedCreatedDate}</span>
        </div>
      </div>
    </Block>
  );
};

export default React.memo(TaskItem);
