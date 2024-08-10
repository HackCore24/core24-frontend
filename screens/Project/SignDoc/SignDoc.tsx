import { FunctionComponent } from "react";
import { ISignDocProps } from "./SignDoc.d";
import styles from "./SignDoc.module.scss";

export const SignDoc: FunctionComponent<
  ISignDocProps
> = (): JSX.Element => {
  return <div className={styles.root}>SignDoc Component</div>;
};
