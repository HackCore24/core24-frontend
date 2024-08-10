import { Task } from "@/screens/Task";
import { headers } from "next/headers";

export default function TaskPage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const splittedPath = (pathname || "").split("/");
  const task_id = splittedPath[splittedPath.length - 1];
  const project_id = splittedPath[splittedPath.length - 3];
  return <Task task_id={task_id} project_id={project_id} />;
}
