import React from "react";
import styles from "./todoCheckHeader.module.css";

export default function TodoCheckHeader({checkCount}) {
  return (
      <h2 className={styles.checkTitle}>
       할 일(<span className={styles.checkCount}>{checkCount}</span>)
      </h2>
  ); 
}