import { TaskItemType, StatusType } from '../app/components/types/tasks';

export const countTasksByStatus = (
  tasks: TaskItemType[] = [],
  status: StatusType,
) => tasks.filter(task => task.status === status).length;