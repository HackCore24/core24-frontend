import { ForwardedRef, forwardRef, FunctionComponent } from "react";
import { ITextFieldProps } from "./TextField.d";
import styles from "./TextField.module.scss";
import cs from "classnames";

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ITextFieldProps
>(function RefTextField({ ...props }, ref): JSX.Element {
  return (
    <input
      {...props}
      ref={ref as ForwardedRef<HTMLInputElement>}
      className={cs(styles.root, props.className)}
    />
  );
});

export const TextFieldNoRef: FunctionComponent<ITextFieldProps> = ({
  ...props
}): JSX.Element => {
  return <input {...props} className={styles.root} />;
};
