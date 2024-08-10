import { Status } from "@/screens/Status";
import { headers } from "next/headers";

export default function StatusPage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const splittedPath = (pathname || "").split("/");
  const project_id = splittedPath[splittedPath.length - 2];
  return <Status project_id={project_id} />;
}
