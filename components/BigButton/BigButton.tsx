import { FunctionComponent } from "react";
import { IBigButtonProps } from "./BigButton.d";
import styles from "./BigButton.module.scss";

export const BigButton: FunctionComponent<IBigButtonProps> = ({
  children,
  startIcon,
  endIcon,
  ...props
}): JSX.Element => {
  return (
    <button className={styles.root} {...props}>
      {Boolean(startIcon) && startIcon}
      {children}
      {Boolean(endIcon) && endIcon}
    </button>
  );
};
