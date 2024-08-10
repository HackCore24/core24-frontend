import { FunctionComponent } from "react";
import { INotImplementedModalProps } from "./NotImplementedModal.d";
import styles from "./NotImplementedModal.module.scss";
import CodeFilledBlue from "@/public/icons/code-filled-blue.svg";
import CloseFilledDark from "@/public/icons/close-filled-dark.svg";

export const NotImplementedModal: FunctionComponent<
  INotImplementedModalProps
> = ({ open, onClose }): JSX.Element => {
  if (!open) {
    return <></>;
  }
  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseFilledDark />
        </div>
        <CodeFilledBlue />
        <h1 className={styles.title}>Это мы разработали за 48 часов</h1>
        <p className={styles.description}>
          Доступны следующие разделы:{" "}
          <span className={styles.linked}>история документа</span>
        </p>
      </div>
    </div>
  );
};
