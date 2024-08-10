"use client";
import { FunctionComponent } from "react";
import { IMainProps } from "./Main.d";
import styles from "./Main.module.scss";
import { useProjects } from "@/api/endpoints/projects";
import { ProjectCard } from "../Project/modules/ProjectCard";
import moment from "moment";
import { useRouter } from "next/navigation";

export const Main: FunctionComponent<IMainProps> = (): JSX.Element => {
  const router = useRouter();
  const pAPI = useProjects();
  const { data: projects, isLoading: projectsLoading } = pAPI.GetAll();
  return (
    <div className={styles.root}>
      {projectsLoading ? (
        <div>Loading...</div>
      ) : (
        projects!.map((project) => (
          <ProjectCard
            key={project.id}
            image={project.caver || ""}
            date={moment(project.created_at).format("DD MMMM YYYY г.")}
            title={project.title}
            description={project.company_name}
            onClick={() => {
              router.push(`/project/${project.id}`);
            }}
          />
        ))
      )}
    </div>
  );
};
