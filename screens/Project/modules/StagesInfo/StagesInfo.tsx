import { FunctionComponent, useMemo } from "react";
import { IStagesInfoProps } from "./StagesInfo.d";
import styles from "./StagesInfo.module.scss";
import ArrowRight from "@/public/icons/arrow-right.svg";
import cs from "classnames";

const StagesChain = ({
  colorChain,
}: {
  colorChain: ("green" | "yellow" | "gray")[];
}): JSX.Element => {
  return (
    <div className={styles.stepperRoot}>
      {colorChain.map((clr, idx) => {
        if (clr === "green") {
          return (
            <div className={styles.stepperItemWrapper} key={`${clr}_${idx}`}>
              <div className={styles.stepperItem} />
              <div className={styles.stepperLine} />
            </div>
          );
        } else if (clr === "yellow") {
          return (
            <div className={cs(styles.stepperItemWrapper, styles.current)}>
              <div className={styles.stepperItem} />
              <div className={styles.stepperLine} />
            </div>
          );
        } else {
          return (
            <div className={cs(styles.stepperItemWrapper, styles.neutral)}>
              <div className={styles.stepperItem} />
              <div className={styles.stepperLine} />
            </div>
          );
        }
      })}
    </div>
  );
};

export const StagesInfo: FunctionComponent<IStagesInfoProps> = ({
  statuses,
  onClick,
}): JSX.Element => {
  const sortedStatuses = useMemo(() => {
    return statuses.sort((a, b) => a.order - b.order);
  }, [statuses]);

  const currentStatus = useMemo(() => {
    const non_passed = sortedStatuses.filter((s) => !s.is_passed);
    if (non_passed.length > 0) {
      return {
        status: non_passed[0],
        idx: statuses.indexOf(non_passed[0]),
      };
    } else {
      return {
        status: null,
        idx: -1,
      };
    }
  }, [sortedStatuses]);

  const colorChain = useMemo(() => {
    return sortedStatuses.map((s, idx) => {
      if (s.is_passed) {
        return "green";
      } else if (idx === currentStatus.idx) {
        return "yellow";
      } else {
        return "gray";
      }
    });
  }, [currentStatus, statuses]);

  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.mainData}>
        <span className={styles.mutedTitle}>Статус проекта:</span>
        <div className={styles.buttonTitle}>
          <h3 className={styles.mainTitle}>{currentStatus.status?.title}</h3>
          <ArrowRight />
        </div>
      </div>
      <StagesChain colorChain={colorChain} />
    </div>
  );
};
