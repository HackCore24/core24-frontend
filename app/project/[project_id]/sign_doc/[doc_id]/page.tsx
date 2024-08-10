import { SignDoc } from "@/screens/SignDoc";
import { headers } from "next/headers";

export default function SignDocumentPage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const splittedPath = (pathname || "").split("/");
  const document_id = splittedPath[splittedPath.length - 1];
  return <SignDoc document_id={document_id} />;
}
