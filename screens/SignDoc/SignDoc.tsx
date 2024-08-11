"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { ISignDocProps } from "./SignDoc.d";
import styles from "./SignDoc.module.scss";

import WordIcon from "@/public/icons/word.svg";
import { useVariables } from "@/api/endpoints/variables";
import documentsAPI, { useDocuments } from "@/api/endpoints/documents";
import { TextField } from "@/components/TextField";
import { IClientVar } from "@/api/models/Variable";
import Check from "@/public/icons/check.svg";
import { useRouter } from "next/navigation";
import { useCookie } from "@/hooks/useCookie";
import { useToggle } from "usehooks-ts";
import projectsAPI from "@/api/endpoints/projects";
import projectStatusesAPI from "@/api/endpoints/project_statuses";

export const SignDoc: FunctionComponent<ISignDocProps> = ({
  document_id,
  project_id,
}): JSX.Element => {
  const router = useRouter();
  const docAPI = useDocuments();
  const varsAPI = useVariables();

  const { data: doc, isLoading: docLoading } = docAPI.getByID(document_id);
  const { data: vars, isLoading: varsLoading } =
    varsAPI.getByProjectID(document_id);
  const [currentVariables, setCurrentVariables] = useState<IClientVar[]>([]);
  const [, setSigned] = useCookie("signed");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    (async () => {
      await documentsAPI.generate(document_id, currentVariables);
      const statuses = await projectStatusesAPI.getByProjectID(project_id);
      const latestStatus = statuses
        .sort((a, b) => a.order - b.order)
        .filter((s) => !s.is_passed)[0];
      await projectStatusesAPI.checkStatus(project_id, latestStatus.id);
      setLoading(false);
      setSigned("yes");
      router.replace(`/project/${project_id}`);
    })();
  };

  if (docLoading || varsLoading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Подписание акта выполненных работ</h1>
      <div className={styles.card}>
        <WordIcon />
        <p className={styles.docDescription}>{doc?.title}</p>
      </div>
      <h3 className={styles.subtitle}>Необходимо заполнить поля:</h3>
      {vars?.map((v) => (
        <div className={styles.fieldContainer}>
          <span className={styles.subtitle}>{v.title}</span>
          <TextField
            className={styles.textField}
            value={currentVariables.find((cv) => cv.title === v.title)?.input}
            onChange={(e) => {
              setCurrentVariables((prev) => {
                const copy = [...prev];
                const elemIdx = copy.findIndex((p) => p.title === v.title);
                if (elemIdx >= 0) {
                  copy[elemIdx] = {
                    title: v.title,
                    key: v.key,
                    input: e.target.value,
                  };
                } else {
                  copy.push({
                    title: v.title,
                    key: v.key,
                    input: e.target.value,
                  });
                }

                return copy;
              });
            }}
            placeholder={`Введите ${v.title}`}
          />
        </div>
      ))}
      {!loading ? (
        <button className={styles.button} onClick={onSubmit}>
          Подтвердить
          <Check />
        </button>
      ) : (
        <button className={styles.button}>Загрузка...</button>
      )}
    </div>
  );
};
