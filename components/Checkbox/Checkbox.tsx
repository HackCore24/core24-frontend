import { FunctionComponent } from "react";
import { ICheckboxProps } from "./Checkbox.d";
import styles from "./Checkbox.module.scss";
import cs from "classnames";

export const Checkbox: FunctionComponent<ICheckboxProps> = ({
  title,
  ...props
}): JSX.Element => {
  if (!title) {
    return (
      <label className={cs(styles.root, styles.noLabel)}>
        <input type="checkbox" id={`checkbox-${styles.input}`} {...props} />
        <span className={styles.checkMark}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.475 8.275L9.575 14.175L7.675 12.275C7.49167 12.0917 7.25833 12 6.975 12C6.69167 12 6.45833 12.0917 6.275 12.275C6.09167 12.4583 6 12.6917 6 12.975C6 13.2583 6.09167 13.4917 6.275 13.675L8.875 16.275C9.075 16.475 9.30833 16.575 9.575 16.575C9.84167 16.575 10.075 16.475 10.275 16.275L16.875 9.675C17.0583 9.49167 17.15 9.25833 17.15 8.975C17.15 8.69167 17.0583 8.45833 16.875 8.275C16.6917 8.09167 16.4583 8 16.175 8C15.8917 8 15.6583 8.09167 15.475 8.275Z"
              fill="white"
            />
          </svg>
        </span>
      </label>
    );
  }
  return (
    <label className={styles.root}>
      <input type="checkbox" id={`checkbox-${styles.input}`} {...props} />
      <span className={styles.checkMark}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.475 8.275L9.575 14.175L7.675 12.275C7.49167 12.0917 7.25833 12 6.975 12C6.69167 12 6.45833 12.0917 6.275 12.275C6.09167 12.4583 6 12.6917 6 12.975C6 13.2583 6.09167 13.4917 6.275 13.675L8.875 16.275C9.075 16.475 9.30833 16.575 9.575 16.575C9.84167 16.575 10.075 16.475 10.275 16.275L16.875 9.675C17.0583 9.49167 17.15 9.25833 17.15 8.975C17.15 8.69167 17.0583 8.45833 16.875 8.275C16.6917 8.09167 16.4583 8 16.175 8C15.8917 8 15.6583 8.09167 15.475 8.275Z"
            fill="white"
          />
        </svg>
      </span>
      <span className={styles.title}>{title}</span>
    </label>
  );
};
