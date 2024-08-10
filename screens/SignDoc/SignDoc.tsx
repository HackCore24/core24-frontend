"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { ISignDocProps } from "./SignDoc.d";
import styles from "./SignDoc.module.scss";

import WordIcon from "@/public/icons/word.svg";
import { useVariables } from "@/api/endpoints/variables";
import { useDocuments } from "@/api/endpoints/documents";
import { TextField } from "@/components/TextField";
import { IClientVar } from "@/api/models/Variable";
import Check from "@/public/icons/check.svg";

export const SignDoc: FunctionComponent<ISignDocProps> = ({
  document_id,
}): JSX.Element => {
  const docAPI = useDocuments();
  const varsAPI = useVariables();

  const { data: doc, isLoading: docLoading } = docAPI.getByID(document_id);
  const { data: vars, isLoading: varsLoading } =
    varsAPI.getByProjectID(document_id);
  const [currentVariables, setCurrentVariables] = useState<IClientVar[]>([]);
  useEffect(() => {
    vars?.forEach((v) => {
      setCurrentVariables((prev) => [
        ...prev,
        {
          title: v.title,
          key: v.title,
          input: "",
        },
      ]);
    });
  }, [vars]);
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
            value={currentVariables.find((cv) => cv.key === v.title)?.input}
            onChange={(e) => {
              setCurrentVariables((prev) => {
                const copy = [...prev];
                const elemIdx = copy.findIndex((p) => p.key === v.title);
                copy[elemIdx] = {
                  title: v.title,
                  key: v.title,
                  input: e.target.value,
                };
                return copy;
              });
            }}
            placeholder={`Введите ${v.title}`}
          />
        </div>
      ))}

      <button className={styles.button}>
        Подтвердить
        <Check />
      </button>
    </div>
  );
};
