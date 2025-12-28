import React, { useMemo } from 'react';
import Block from '../layout/block';
import NumberBlock from './numberBlock';
import { TaskItemType } from '../types/tasks';
import { countTasksByStatus } from '../../../utils/list';

type OverviewProps = {
  taskList: TaskItemType[];
};

const Overview: React.FC<OverviewProps> = ({ taskList }) => {
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

  return (
    <Block>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">نمای کلی</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
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