import { IconClipboard, IconLogin, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Project Board</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
            >
              <IconClipboard />
              Board
            </Link>
          </li>
        </ul>
      </nav>

      {user ? (
        <button
          onClick={logout}
          className="m-4 flex items-center gap-3 px-4 py-2 text-sm font-medium text-black bg-blue-50 hover:bg-blue-200 transition-all duration-200 rounded-lg"
        >
          <IconLogout />
          logout
        </button>
      ) : (
        <Link
          to="/login"
          className="m-4 flex items-center gap-3 px-4 py-2 text-sm font-medium text-black bg-blue-50 hover:bg-blue-200 transition-all duration-200 rounded-lg"
        >
          <IconLogin />
          login
        </Link>
      )}

      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
