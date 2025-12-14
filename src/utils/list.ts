// i
import { TaskItemType } from "../app/components/types/tasks";

export const countTasksByStatus = (tasks: TaskItemType[], status: string) => {
  return tasks.filter(task => task.status === status).length;
};