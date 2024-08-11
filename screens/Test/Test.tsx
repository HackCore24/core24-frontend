"use client";
import { FunctionComponent } from "react";
import { ITestProps } from "./Test.d";
import styles from "./Test.module.scss";
import testImg from "@/public/image.png";
import Image from "next/image";
import axios from "axios";

export const Test: FunctionComponent<ITestProps> = (): JSX.Element => {
  const onDL = () => {
    const uri =
      "https://storage.yandexcloud.net/recplace/%D0%A1%D0%BC%D0%B5%D1%82%D0%B0%20%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%BE%20%D0%B6%D0%B8%D0%BB%D0%BE%D0%B3%D0%BE%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%B0.xlsx";
    const r = axios.get(uri, { responseType: "blob" }).then((r) => {
      const url = window.URL.createObjectURL(new Blob([r.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Смета Строительство жилого комплекса.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return "ok";
    });
  };
  return (
    <div className={styles.root}>
      <Image
        src={testImg}
        alt="test image"
        width={1800}
        height={1030}
        className={styles.img}
      />
      <div className={styles.modal}>
        <div className={styles.titleAndClose}>
          <div className={styles.title}>Проверка данных</div>
          <div className={styles.button}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                cursor: "pointer",
              }}
            >
              <path
                d="M12.0008 13.4L7.10078 18.3C6.91745 18.4833 6.68411 18.575 6.40078 18.575C6.11745 18.575 5.88411 18.4833 5.70078 18.3C5.51745 18.1167 5.42578 17.8833 5.42578 17.6C5.42578 17.3167 5.51745 17.0833 5.70078 16.9L10.6008 12L5.70078 7.09999C5.51745 6.91665 5.42578 6.68332 5.42578 6.39999C5.42578 6.11665 5.51745 5.88332 5.70078 5.69999C5.88411 5.51665 6.11745 5.42499 6.40078 5.42499C6.68411 5.42499 6.91745 5.51665 7.10078 5.69999L12.0008 10.6L16.9008 5.69999C17.0841 5.51665 17.3174 5.42499 17.6008 5.42499C17.8841 5.42499 18.1174 5.51665 18.3008 5.69999C18.4841 5.88332 18.5758 6.11665 18.5758 6.39999C18.5758 6.68332 18.4841 6.91665 18.3008 7.09999L13.4008 12L18.3008 16.9C18.4841 17.0833 18.5758 17.3167 18.5758 17.6C18.5758 17.8833 18.4841 18.1167 18.3008 18.3C18.1174 18.4833 17.8841 18.575 17.6008 18.575C17.3174 18.575 17.0841 18.4833 16.9008 18.3L12.0008 13.4Z"
                fill="#3D3C43"
                fill-opacity="0.6"
              />
            </svg>
          </div>
        </div>
        <div className={styles.modalWindowInner}>
          <div className={styles.titleParent}>
            <div className={styles.title1}>Подобрали следующие позиции</div>
            <div className={styles.title2}>
              <ul className={styles.ul}>
                <li className={styles.li}>Щебень</li>
                <li className={styles.li}>Песок</li>
                <li>Асфальтобетонная смесь</li>
                <li>Бордюрный камень</li>
                <li>Тротуарная плитка</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.wrapper}>
            <div className={styles.div}>Изменить</div>
          </div>
          <div
            className={styles.container}
            style={{
              cursor: "pointer",
            }}
          >
            <div className={styles.div} onClick={onDL}>
              Продолжить
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
