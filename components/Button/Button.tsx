import { FunctionComponent } from "react";
import { IButtonProps } from "./Button.d";
import styles from "./Button.module.scss";

export const Button: FunctionComponent<IButtonProps> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <button className={styles.root} {...props}>
      {children}
    </button>
  );
};
