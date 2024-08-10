import projectsAPI from "@/api/endpoints/projects";
import { Project } from "@/screens/Project";
import { headers } from "next/headers";

export default async function ProjectPage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const splittedPath = (pathname || "").split("/");
  const project_id = splittedPath[splittedPath.length - 1];

  const project_data = await projectsAPI.getByID(project_id);
  return <Project project={project_data} />;
}
