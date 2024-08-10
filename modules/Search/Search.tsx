import { FunctionComponent } from "react";
import { ISearchProps } from "./Search.d";
import styles from "./Search.module.scss";
import SearchIcon from "@/public/icons/search.svg";

export const Search: FunctionComponent<ISearchProps> = (): JSX.Element => {
  return (
    <div className={styles.inputWrapper}>
      <SearchIcon className={styles.icon} />
      <input className={styles.root} placeholder="Найти..." />
    </div>
  );
};
