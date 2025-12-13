export type StatusType = 'inProgress' | 'notStarted' | 'done';

export type TaskItemProps = {
  taskId: string | number;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  status: StatusType;
  category: string;
};

