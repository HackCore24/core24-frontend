import { FunctionComponent } from "react";
import { IProjectCardProps } from "./ProjectCard.d";
import styles from "./ProjectCard.module.scss";
import Image from "next/image";

export const ProjectCard: FunctionComponent<IProjectCardProps> = ({
  image,
  date,
  title,
  description,
  onClick,
}): JSX.Element => {
  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.container}>
        <Image
          src={image}
          alt="project image"
          width={120}
          height={120}
          className={styles.image}
        />
        <div className={styles.texts}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
      <div className={styles.dateContainer}>{date}</div>
    </div>
  );
};
