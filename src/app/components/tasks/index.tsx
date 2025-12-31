import React from 'react';
import TaskItem from './taskItem';
import { TaskItemType } from '../types/tasks';

type TasksListProps = {
  taskList: TaskItemType[];
  onDeleteTask: (taskId: string) => void;
};

const TasksList: React.FC<TasksListProps> = ({ taskList, onDeleteTask }) => {
  if (!taskList || taskList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">هیچ وظیفه‌ای برای نمایش وجود ندارد.</p>
        <p className="text-gray-400 text-sm mt-2">لطفاً فیلترها را تغییر دهید یا وظیفه جدیدی اضافه کنید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {taskList.map((task) => (
        <TaskItem
          key={task.taskId}
          taskId={task.taskId}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
          priority={task.priority}
          status={task.status}
          category={task.category}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default React.memo(TasksList);