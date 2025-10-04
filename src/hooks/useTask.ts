import { useContext } from "react";
import { TaskContext } from "../contexts/taskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("Task Context is undefined");
  }
  return context;
};
