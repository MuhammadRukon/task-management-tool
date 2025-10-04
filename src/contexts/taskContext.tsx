import { createContext, useState } from "react";
import type { ITask, IUser } from "../interfaces";

interface TaskContextType {
  tasks: ITask[];
  refetchTasks: boolean;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  users: IUser[];
  refetchUsers: boolean;
  setRefetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [refetchTasks, setRefetchTasks] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(false);
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        users,
        setUsers,
        refetchTasks,
        setRefetchTasks,
        refetchUsers,
        setRefetchUsers,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
