import { FunctionComponent } from "react";
import { IMultiButtonProps } from "./MultiButton.d";
import styles from "./MultiButton.module.scss";
import ArrowRight from "@/public/icons/arrow-right.svg";
import cs from "classnames";

export const MultiButton: FunctionComponent<IMultiButtonProps> = ({
  title,
  description,
  secondaryDescription,
  startIcon,
  onClick,
}): JSX.Element => {
  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.mainContainer}>
        {Boolean(startIcon) && startIcon}
        <div className={styles.texts}>
          <div className={styles.title}>{title}</div>
          <div
            className={cs(styles.description, {
              [styles.single]: !Boolean(secondaryDescription),
            })}
          >
            {description}
          </div>
          {secondaryDescription && (
            <div className={styles.description}>{secondaryDescription}</div>
          )}
        </div>
      </div>
      {onClick && <ArrowRight />}
    </div>
  );
};
