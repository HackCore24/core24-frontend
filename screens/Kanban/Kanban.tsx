import { FunctionComponent } from "react";
import { IKanbanProps } from "./Kanban.d";
import styles from "./Kanban.module.scss";

export const Kanban: FunctionComponent<
  IKanbanProps
> = (): JSX.Element => {
  return <div className={styles.root}>Kanban Component</div>;
};
