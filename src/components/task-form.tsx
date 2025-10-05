import { useState } from "react";
import { Input } from "./input";
import { useTask } from "../hooks/useTask";
import { useAuth } from "../hooks/useAuth";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: Date;
    assignedUser: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    assignedUser: string;
  };
  onDelete: (_id: string) => void;
}

export function TaskForm({
  onSubmit,
  onCancel,
  initialData,
  onDelete,
}: TaskFormProps) {
  const { users } = useTask();
  const { user } = useAuth();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [assignedUser, setAssignedUser] = useState(
    initialData?.assignedUser || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate: new Date(dueDate), assignedUser });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />

      <Input
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />

      <Input
        label="Due Date"
        type="date"
        value={dueDate.toString().split("T")[0]}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder=""
      />

      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        value={
          initialData ? initialData.assignedUser : assignedUser || "default"
        }
        onChange={(e) => setAssignedUser(e.target.value)}
      >
        <option value="default" disabled>
          Select User
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 pt-4">
        <button
          disabled={
            !title || !description || !dueDate || !assignedUser || !user
          }
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
        {initialData && (
          <button
            type="button"
            disabled={!user}
            onClick={() => onDelete(initialData?._id)}
            className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Task
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
