import React from "react";
import styles from "./todoCompleteHeader.module.css";

export default function TodoCompleteHeader({completeCount}) {
  return (
      <h2 className={styles.completeTitle}>
       완료(<span className={styles.completeCount}>{completeCount}</span>)
      </h2>
  );
}