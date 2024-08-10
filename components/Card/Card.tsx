import { FunctionComponent } from "react";
import { ICardProps } from "./Card.d";
import styles from "./Card.module.scss";
import { title } from "process";

export const Card: FunctionComponent<ICardProps> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
};
