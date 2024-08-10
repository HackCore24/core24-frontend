"use client";
import { FunctionComponent } from "react";
import { ITaskProps } from "./Task.d";
import styles from "./Task.module.scss";
import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { useProjectTasks } from "@/api/endpoints/project_tasks";
import moment from "moment";
import "moment/locale/ru";
import { useUsers } from "@/api/endpoints/users";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
moment.locale("ru");

export const Task: FunctionComponent<ITaskProps> = ({
  task_id,
}): JSX.Element => {
  const router = useRouter();
  const ptAPI = useProjectTasks();
  const uAPI = useUsers();
  const { data: taskData, isLoading: taskLoading } = ptAPI.getByID(task_id);
  const {
    data: respUser,
    isLoading: respLoading,
    error: respNotFound,
  } = uAPI.GetByID(taskData?.responsible_user_id || "");
  if (taskLoading || respLoading || respNotFound) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.root}>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Назад
      </Button>
      <Card title="Название задачи">
        <div className={styles.container}>
          <div className={styles.chapterContainer}>
            <span className={styles.subtitleMd}>План действий</span>
            <div className={styles.tasksContainer}>
              {taskData?.checkbox_tasks.map((ctask) => (
                <Checkbox title={ctask.title} key={ctask.title} />
              ))}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.chapterContainer}>
              <span className={styles.subtitle}>Срок выполнения</span>
              <span className={styles.mainTitle}>
                {moment(taskData?.deadline).format("DD MMMM YYYY г.")}
              </span>
            </div>
            <div className={styles.chapterContainer}>
              <span className={styles.subtitle}>Приоритет</span>
              <span className={styles.mainTitle}>Средний</span>
            </div>
          </div>

          <div className={styles.chapterContainer}>
            <span className={styles.subtitle}>Ответственный</span>
            <span className={styles.mainTitle}>
              {respUser &&
                `${respUser.firstname} ${respUser.lastname} (${respUser.role})`}
            </span>
          </div>
          <div className={styles.chapterContainer}>
            <span className={styles.subtitle}>Какие ресурсы нужны</span>
            <span className={styles.mainTitle}>
              {taskData?.necessary_resources || "Не указано"}
            </span>
          </div>
          <div className={styles.chapterContainer}>
            <span className={styles.subtitle}>
              Какой результат хочу получить
            </span>
            <span className={styles.mainTitle}>
              {taskData?.desired_result || "Не указано"}
            </span>
          </div>
          <div className={styles.chapterContainer}>
            <span className={styles.subtitle}>
              Комментарий к завершению задачи
            </span>
            <span className={styles.mainTitle}>
              {taskData?.comments || "Не указано"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
