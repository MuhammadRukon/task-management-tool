import { Input } from "../../components/input";
import { Sidebar } from "../../components/sidebar";
import { Modal } from "../../components/modal";
import { TaskForm } from "../../components/task-form";
import { useEffect, useState } from "react";
import { useTask } from "../../hooks/useTask";
import type { ITask, IUser } from "../../interfaces";
import { useAuth } from "../../hooks/useAuth";

type Status = "pending" | "in-progress" | "complete";

interface BoardColumnProps {
  tasks: ITask[];
  status: Status;
  onDrop: (e: React.DragEvent, status: Status) => void;
  onDragOver: (e: React.DragEvent, status: Status) => void;
  onDragLeave: (e: React.DragEvent) => void;
  dragOverColumn: Status | null;
  setDraggedTaskId: (id: string) => void;
  onEditTask: (task: ITask) => void;
  users: IUser[];
}

export function Board() {
  const {
    tasks,
    setTasks,
    setUsers,
    refetchTasks,
    refetchUsers,
    setRefetchTasks,
    users,
  } = useTask();

  const { user } = useAuth();

  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const onDragOver = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  };

  const onDrop = async (e: React.DragEvent, targetStatus: Status) => {
    e.preventDefault();
    setDragOverColumn(null);

    const task = tasks.find((task) => task._id === draggedTaskId);
    if (task?.status === targetStatus) {
      return;
    }

    if (!user) return;
    // optimistic update
    const previousTasks = [...tasks];
    const updatedTasks = tasks.map((task) =>
      task._id === draggedTaskId ? { ...task, status: targetStatus } : task
    );
    setTasks(updatedTasks);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${draggedTaskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: targetStatus }),
      }
    );
    if (response.ok) {
      setRefetchTasks((prev) => !prev);
    } else {
      setTasks(previousTasks);
    }

    setDraggedTaskId(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      setRefetchTasks((prev) => !prev);
    }

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleTaskSubmit = async (taskData: {
    title: string;
    description: string;
    dueDate: Date;
    assignedUser: string;
  }) => {
    if (editingTask) {
      // Update existing task
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${editingTask._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      if (response.ok) {
        setRefetchTasks((prev) => !prev);
      }
    } else {
      const data: Partial<ITask> = {
        title: taskData.title,
        description: taskData.description,
        dueDate: new Date(taskData.dueDate),
        status: "pending",
        assignedUser: taskData.assignedUser,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const newTask = await response.json();

      if (newTask) {
        setRefetchTasks((prev) => !prev);
      }
    }
    handleCloseModal();
  };

  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const tasks = await data.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, [refetchTasks, setTasks]);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      const users = await data.json();
      setUsers(users);
    };
    fetchUsers();
  }, [refetchUsers, setUsers]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-x-auto">
        <div className="p-6 space-y-6">
          <Board.Header />
          <Board.Action
            onAddTask={handleAddTask}
            onSearch={handleSearch}
            search={search}
          />
          <div className="flex gap-6 min-w-max">
            {(["pending", "in-progress", "complete"] as Status[]).map(
              (status) => (
                <Board.Column
                  users={users}
                  key={status}
                  tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
                  status={status}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  dragOverColumn={dragOverColumn}
                  setDraggedTaskId={setDraggedTaskId}
                  onEditTask={handleEditTask}
                />
              )
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          onSubmit={handleTaskSubmit}
          onCancel={handleCloseModal}
          onDelete={handleDeleteTask}
          initialData={
            editingTask
              ? {
                  _id: editingTask._id,
                  title: editingTask.title,
                  description: editingTask.description,
                  dueDate: editingTask.dueDate,
                  assignedUser: editingTask.assignedUser,
                }
              : undefined
          }
        />
      </Modal>
    </div>
  );
}

Board.Header = () => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Sprint Board</h2>
      <p className="text-sm text-gray-600 mt-1">
        Manage your tasks across different stages
      </p>
    </div>
  );
};

Board.Action = ({
  onAddTask,
  onSearch,
  search,
}: {
  onAddTask: () => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={search}
        onChange={onSearch}
        placeholder="Search Task"
      />
      <button
        disabled={!user}
        onClick={onAddTask}
        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

Board.Column = ({
  tasks,
  status,
  onDrop,
  onDragOver,
  onDragLeave,
  dragOverColumn,
  setDraggedTaskId,
  onEditTask,
  users,
}: BoardColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);
  const isDragOver = dragOverColumn === status;

  return (
    <div className="w-80 flex-shrink-0">
      <div
        className={`bg-white rounded-lg border ${
          isDragOver
            ? "border-blue-400 shadow-md shadow-blue-200"
            : "border-gray-200"
        }`}
        onDragOver={(e) => onDragOver(e, status)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, status)}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 ${
                status === "pending"
                  ? "bg-gray-400"
                  : status === "in-progress"
                  ? "bg-yellow-400"
                  : "bg-green-400"
              } rounded-full`}
            ></div>
            <h3 id={status} className="font-semibold text-gray-900 capitalize">
              {status.replace("-", " ")}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredTasks.length}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3 min-h-[100px]">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                draggable
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-grab hover:shadow-md"
                onDragStart={() => {
                  setDraggedTaskId(task._id);
                }}
                onClick={() => onEditTask(task)}
              >
                <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs text-gray-500">
                    {/* TODO: find a better way to get the user name */}
                    {users.find((user) => user._id === task.assignedUser)?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    Deadline: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No tasks {status.replace("-", " ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
