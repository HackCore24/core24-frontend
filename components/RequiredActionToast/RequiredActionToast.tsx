import { FunctionComponent } from "react";
import { IRequiredActionToastProps } from "./RequiredActionToast.d";
import styles from "./RequiredActionToast.module.scss";
import { Button } from "../Button";

export const RequiredActionToast: FunctionComponent<
  IRequiredActionToastProps
> = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h5 className={styles.mutedTitle}>Требуется действие:</h5>
        <h4 className={styles.mainTitle}>Подписание акта выполненных работ</h4>
      </div>
      <Button>Перейти</Button>
    </div>
  );
};
