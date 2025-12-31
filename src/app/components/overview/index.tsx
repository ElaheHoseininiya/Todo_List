'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import Block from '../layout/block';
import NumberBlock from './numberBlock';
import { TaskItemType } from '../types/tasks';
import { countTasksByStatus } from '../../../utils/list';

type OverviewProps = {
  taskList: TaskItemType[];
};

const Overview: React.FC<OverviewProps> = ({ taskList }) => {
  const router = useRouter();
  const hasTasks = useMemo(() => (taskList?.length ?? 0) > 0, [taskList]);

  if (!taskList) {
    return (
      <Block>
        <p className="text-sm text-gray-500">در حال بارگذاری...</p>
      </Block>
    );
  }

  const totalTasks = useMemo(() => taskList.length || 0, [taskList]);
  const notStartedCount = useMemo(
    () => countTasksByStatus(taskList, 'notStarted'),
    [taskList]
  );
  const inProgressCount = useMemo(
    () => countTasksByStatus(taskList, 'inProgress'),
    [taskList]
  );
  const doneCount = useMemo(
    () => countTasksByStatus(taskList, 'done'),
    [taskList]
  );

  const handleAddNewTask = () => {
    router.push('/tasks/new');
  };

  return (
    <Block>
      <div>
        <div>
          <h2 className="text-xl font-bold">نمای کلی</h2>
          <button 
            onClick={handleAddNewTask}
            className="px-6 py-2 text-black rounded-lg hover:text-gray-700 transition-colors font-medium mt-4 border-none flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5 text-black" />
            افزودن وظیفه جدید
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto mt-4">
          <NumberBlock number={totalTasks} title="مجموع" color="blue" />
          <NumberBlock
            number={notStartedCount}
            title="در انتظار"
            color="yellow"
          />
          <NumberBlock 
            number={inProgressCount}
            title="در حال انجام"
            color="green"
          />
          <NumberBlock number={doneCount} title="تکمیل شده" color="red" />
        </div>
      </div>
      {!hasTasks && (
        <p className="text-sm text-gray-500 mt-4">
          هیچ وظیفه‌ای برای نمایش وجود ندارد.
        </p>
      )}
    </Block>
  );
};

export default React.memo(Overview);