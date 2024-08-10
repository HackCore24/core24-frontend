"use client";
import { FunctionComponent, useMemo } from "react";
import { IStatusProps } from "./Status.d";
import styles from "./Status.module.scss";
import WordIcon from "@/public/icons/word.svg";
import { useProjectStatuses } from "@/api/endpoints/project_statuses";
import moment from "moment";
import cs from "classnames";
import "moment/locale/ru";
import { IProjectStatus } from "@/api/models/ProjectStatus";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
moment.locale("ru");

export const Status: FunctionComponent<IStatusProps> = ({
  project_id,
}): JSX.Element => {
  const router = useRouter();
  const pAPI = useProjectStatuses();
  const { data: projectData, isLoading: projectLoading } =
    pAPI.getByProjectID(project_id);

  const currentStep = useMemo<null | IProjectStatus>(() => {
    if (!projectData) {
      return null;
    }
    return projectData.filter((s) => !s.is_passed)[0];
  }, [projectData]);
  return (
    <div className={styles.root}>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Назад
      </Button>
      <div className={styles.card}>
        <div className={styles.header}>
          <WordIcon />
          <span className={styles.desc}>
            Техническое_задание_Ограничитель консоли, Опора двусторонняя СТ-062,
            Стойка вертикальная опорная (балка).docx
          </span>
        </div>
        <div className={styles.stepper}>
          {projectData?.map((step) => (
            <>
              <div
                className={cs(styles.stepperItemWrapper, {
                  [styles.neutral]: !step.is_passed,
                  [styles.current]: currentStep === step,
                })}
              >
                <div className={styles.stepperItem} />
                <div className={styles.stepperLine} />
              </div>
              <div className={styles.stepInfoContainer}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                {Boolean(step.date_reach) && (
                  <span className={styles.stepDate}>
                    {moment(step.date_reach).format("DD MMMM YYYY г.")}
                  </span>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
