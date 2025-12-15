import React, { Suspense } from 'react';
import TasksShell from './components/tasksShell';
import { taskList } from '../mocks/tasks';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <div className="container h-full">
        <Suspense fallback={<div className="text-center">در حال بارگذاری...</div>}>
          <TasksShell initialTasks={taskList} />
        </Suspense>
      </div>
    </div>
  );
}
