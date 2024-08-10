import { ForwardedRef, forwardRef, FunctionComponent } from "react";
import { ITextFieldProps } from "./TextField.d";
import styles from "./TextField.module.scss";

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ITextFieldProps
>(function RefTextField({ ...props }, ref): JSX.Element {
  return (
    <input
      {...props}
      ref={ref as ForwardedRef<HTMLInputElement>}
      className={styles.root}
    />
  );
});

export const TextFieldNoRef: FunctionComponent<ITextFieldProps> = ({
  ...props
}): JSX.Element => {
  return <input {...props} className={styles.root} />;
};
