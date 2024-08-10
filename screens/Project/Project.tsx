"use client";
import { FunctionComponent, useMemo } from "react";
import { IProjectProps } from "./Project.d";
import styles from "./Project.module.scss";
import Image from "next/image";
import cs from "classnames";
import { StagesInfo } from "./modules/StagesInfo";
import { BigButton } from "@/components/BigButton";
import PlusBlue from "@/public/icons/plus-blue.svg";
import WarnBlue from "@/public/icons/warn-blue.svg";
import { Card } from "@/components/Card";
import { MultiButton } from "@/components/MultiButton";
import CheckBlueFilled from "@/public/icons/check-filled-blue.svg";
import CheckGreenFilled from "@/public/icons/check-filled-green.svg";
import { ProjectCard } from "./modules/ProjectCard";
import { RequiredActionToast } from "@/components/RequiredActionToast";
import { useProjectStatuses } from "@/api/endpoints/project_statuses";
import { useProjectDocuments } from "@/api/endpoints/documentation";
import { useProjectTasks } from "@/api/endpoints/project_tasks";
import moment from "moment";
import "moment/locale/ru";
import { useProjects } from "@/api/endpoints/projects";
import { useProjectBudget } from "@/api/endpoints/project_budget";
import { declOfNum, reduceNum } from "@/lib/helpers";
import { NotImplementedModal } from "@/components/NotImplementedModal";
import { useToggle } from "usehooks-ts";

moment.locale("ru");

export const Project: FunctionComponent<IProjectProps> = ({
  project,
}): JSX.Element => {
  const pAPI = useProjects();
  const psAPI = useProjectStatuses();
  const psDocsAPI = useProjectDocuments();
  const psTasks = useProjectTasks();
  const psBudgetAPI = useProjectBudget();
  const [modalOpened, toggleModalOpen] = useToggle();

  const { data: projectStatuses, isLoading: statusesLoading } =
    psAPI.getByProjectID(project.id);

  const { data: projectDocuments, isLoading: documentsLoading } =
    psDocsAPI.getByProjectID(project.id);

  const { data: projectTasks, isLoading: tasksLoading } =
    psTasks.getByProjectID(project.id);

  const { data: relatedProjects, isLoading: relatedLoading } = pAPI.getRelated(
    project.id
  );

  const { data: projectBudget, isLoading: budgetLoading } =
    psBudgetAPI.getByProjectID(project.id);

  const currentStatus = useMemo(() => {
    if (!projectStatuses) {
      return null;
    }
    const non_passed = projectStatuses
      .filter((s) => !s.is_passed)
      .sort((a, b) => a.order - b.order);
    if (non_passed.length > 0) {
      return non_passed[0];
    } else {
      return null;
    }
  }, [projectStatuses]);

  if (
    statusesLoading ||
    documentsLoading ||
    tasksLoading ||
    relatedLoading ||
    budgetLoading
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.root}>
      <NotImplementedModal open={modalOpened} onClose={toggleModalOpen} />
      <div className={styles.titleBlock}>
        <Image
          src={project.caver || ""}
          alt="project image"
          width={95}
          height={95}
          className={styles.image}
        />
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <div className={styles.pilesRow}>
          <div className={cs(styles.pile, styles.stage)}>
            {currentStatus ? currentStatus.title : "Завершен"}
          </div>
          <div className={styles.pile}>{project.company_name}</div>
        </div>
      </div>

      <StagesInfo statuses={projectStatuses!} />

      <div className={styles.buttonsContainer}>
        <BigButton startIcon={<PlusBlue />} onClick={toggleModalOpen}>
          Новая задача
        </BigButton>
        <BigButton startIcon={<WarnBlue />} onClick={toggleModalOpen}>
          Проблемы
        </BigButton>
      </div>

      <Card title="Документация">
        <div className={styles.buttonsMenuContainer}>
          <MultiButton
            onClick={toggleModalOpen}
            title="История изменений"
            description={`${projectDocuments?.length} ${declOfNum(
              projectDocuments?.length || 0,
              ["изменение", "изменения", "изменений"]
            )}`}
          />
          <MultiButton
            title="Прикрепленные файлы"
            description={`${
              projectDocuments?.filter((p) => Boolean(p.file_link)).length
            } ${declOfNum(
              projectDocuments?.filter((p) => Boolean(p.file_link)).length || 0,
              ["файл", "файла", "файлов"]
            )}`}
            onClick={toggleModalOpen}
          />
          <MultiButton
            title={`${
              projectDocuments?.filter((p) => Boolean(p.electronic_signature))
                .length
            } ${declOfNum(
              projectDocuments?.filter((p) => Boolean(p.electronic_signature))
                .length || 0,
              ["подпись", "подписи", "подписей"]
            )}`}
            description="2 подписи"
            onClick={toggleModalOpen}
          />
        </div>
      </Card>
      <Card title="Задачи проекта">
        <div style={{ width: "100%" }}>
          <h5 className={styles.cardMenuSubtitle}>В работе</h5>
          <div className={styles.buttonsMenuContainer}>
            {projectTasks
              ?.filter((t) => t.status === "in progress")
              .map((task) => (
                <MultiButton
                  startIcon={<CheckBlueFilled />}
                  title={task.plan}
                  description={moment(task.created_at).format("DD MMMM")}
                  secondaryDescription="3 ответственных"
                  onClick={toggleModalOpen}
                />
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <h5 className={styles.cardMenuSubtitle}>Запланированы</h5>
          <div className={styles.buttonsMenuContainer}>
            {projectTasks
              ?.filter((t) => t.status === "pending")
              .map((task) => (
                <MultiButton
                  startIcon={<CheckBlueFilled />}
                  title={task.plan}
                  description={moment(task.created_at).format("DD MMMM")}
                  secondaryDescription="3 ответственных"
                  onClick={toggleModalOpen}
                />
              ))}
          </div>
        </div>
      </Card>
      <Card title="Связанные проекты">
        {relatedProjects?.map((rp) => (
          <ProjectCard
            title={rp.title}
            description={rp.company_name}
            date={moment(rp.created_at).format("с DD MMMM YYYY г.")}
            image={rp.caver || ""}
          />
        ))}
      </Card>
      <Card title="Платежи и финансы">
        <MultiButton
          title="Бюджет согласован"
          description="Статус"
          startIcon={<CheckGreenFilled />}
        />
        <MultiButton
          title={`Остаток: ${reduceNum(
            projectBudget?.credit_limit || 0
          )} рублей`}
          description="Кредитный лимит"
          startIcon={<CheckGreenFilled />}
        />
      </Card>
      <div className={styles.toastContainer}>
        <RequiredActionToast />
      </div>
    </div>
  );
};
