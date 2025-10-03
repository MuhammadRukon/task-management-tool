import { IconClipboard } from "@tabler/icons-react";

type Status = "pending" | "inProgress" | "complete";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  assinedUser: string;
  dueDate: string;
}

export function Board() {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Design new landing page",
      description: "Create mockups for the new homepage",
      status: "pending",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 2,
      title: "Update documentation",
      description: "Add API reference docs",
      status: "inProgress",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 3,
      title: "Fix login bug",
      description: "Users unable to login with email",
      status: "complete",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 4,
      title: "Implement search feature",
      description: "Add full-text search capability",
      status: "inProgress",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 5,
      title: "Database migration",
      description: "Migrate to new schema",
      status: "complete",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },

    {
      id: 6,
      title: "Setup CI/CD pipeline",
      description: "Configure GitHub Actions",
      status: "inProgress",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 7,
      title: "User authentication",
      description: "Implement OAuth login",
      status: "complete",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
    {
      id: 8,
      title: "Create dashboard",
      description: "Build admin dashboard",
      status: "complete",
      assinedUser: "John Doe",
      dueDate: "2025-01-01",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Project Board</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                <IconClipboard />
                Board
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-auto">
        <div className="p-6">
          <Board.Header />
          <div className="flex gap-6 min-w-max">
            <Board.Column tasks={tasks} status="pending" />
            <Board.Column tasks={tasks} status="inProgress" />
            <Board.Column tasks={tasks} status="complete" />
          </div>
        </div>
      </div>
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

Board.Column = ({ tasks, status }: { tasks: Task[]; status: Status }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 ${
                status === "pending"
                  ? "bg-gray-400"
                  : status === "inProgress"
                  ? "bg-yellow-400"
                  : "bg-green-400"
              } rounded-full`}
            ></div>
            <h3 id={status} className="font-semibold text-gray-900 capitalize">
              {status}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredTasks.length}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3 min-h-[200px]">
          {filteredTasks.map((task) => (
            <div
              draggable
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer"
            >
              <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs text-gray-500">
                  {task.assinedUser}
                </span>
                <span className="text-xs text-gray-500">
                  Deadline: {task.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
