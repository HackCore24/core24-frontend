import { FunctionComponent } from "react";
import { ITemplateNameProps } from "./TemplateName.d";
import styles from "./TemplateName.module.scss";

export const TemplateName: FunctionComponent<
  ITemplateNameProps
> = (): JSX.Element => {
  return <div className={styles.root}>TemplateName Component</div>;
};
