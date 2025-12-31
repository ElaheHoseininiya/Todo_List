import React, { useMemo, useState } from 'react';
import Block from '../layout/block';
import Chip from '../ui/chip';
import Modal from '../ui/modal';
import { formatDate } from '../../../utils/date';

import { priorityChip, statusChip } from '../../constants/tasks';
import {
  FolderIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { TaskItemType } from '../types/tasks';

type TaskItemProps = TaskItemType & {
  onDeleteTask: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  taskId,
  title,
  description,
  dueDate,
  createdAt,
  priority,
  status,
  category,
  onDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const priorityTag = useMemo(() => priorityChip[priority] || {}, [priority]);
  const statusTag = useMemo(() => statusChip[status] || {}, [status]);

  const formattedDueDate = useMemo(() => formatDate(dueDate), [dueDate]);
  const formattedCreatedDate = useMemo(() => formatDate(createdAt), [createdAt]);

  const handleTitleClick: () => void = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal: () => void = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick: () => void = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete: () => void = () => {
    onDeleteTask(taskId);
    setIsDeleteConfirmOpen(false);
  };

  const handleCancelDelete: () => void = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <Block>
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <h3
              className="font-bold cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleTitleClick}
            >
              {title}
            </h3>
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
          <PencilSquareIcon className="h-5 w-5 text-gray-500 me-2 cursor-pointer hover:text-blue-600 transition-colors" />
          <TrashIcon 
            className="h-5 w-5 text-gray-500 cursor-pointer hover:text-red-600 transition-colors" 
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      <p className="mb-2">{description}</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex">
          <FolderIcon className="h-5 w-5 text-gray-500 me-2" />
          <span className="text-gray-600 mx-2">{category}</span>
        </div>
        <div className="flex">
          <CalendarIcon className="h-5 w-5 text-gray-500 me-2" />
          <span className="text-gray-600 mx-2">{formattedDueDate}</span>
        </div>
        <div className="flex">
          <ClockIcon className="h-5 w-5 text-gray-500 me-2" />
          <span className="text-gray-600 mx-2">{formattedCreatedDate}</span>
        </div>
      </div>
    </Block>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-1">توضیحات</h3>
          <p className="text-gray-800">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FolderIcon className="h-5 w-5 text-gray-500 me-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-500">دسته‌بندی</p>
              <p className="text-gray-800">{category}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500 me-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-500">تاریخ سررسید</p>
              <p className="text-gray-800">{formattedDueDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-500 me-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-500">تاریخ ایجاد</p>
              <p className="text-gray-800">{formattedCreatedDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">اولویت</p>
            {priorityTag.label && (
              <Chip
                label={priorityTag.label}
                color={priorityTag.color}
                textColor={priorityTag.textColor}
              />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">وضعیت</p>
            {statusTag.label && (
              <Chip
                label={statusTag.label}
                color={statusTag.color}
                textColor={statusTag.textColor}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
    <Modal 
      isOpen={isDeleteConfirmOpen} 
      onClose={handleCancelDelete} 
      title="تأیید حذف"
    >
      <div className="space-y-4">
        <p className="text-gray-800">
          آیا از حذف وظیفه <strong>"{title}"</strong> اطمینان دارید؟
        </p>
        <p className="text-sm text-gray-500">
          این عمل قابل بازگشت نیست.
        </p>
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            حذف
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default React.memo(TaskItem);
