export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "complete";
  dueDate: Date;
  assignedUser: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}
