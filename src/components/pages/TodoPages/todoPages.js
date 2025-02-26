import React from "react";
import styles from "./todoPages.module.css";
import TodoTemplates from "../../templates/TodoTemplates/todoTemplates";

export default function todoPages() {
  return (
    <div className={styles.body}>
      <TodoTemplates />
    </div>
  );
}
