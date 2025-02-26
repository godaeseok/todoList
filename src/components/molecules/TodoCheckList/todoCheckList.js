import React from "react";
import styles from "./todoCheckList.module.css";
import Button from "../../atoms/button";

export default function TodoCheckList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  // categories
  isEditable,
  onEditContent,
  onEditDouble,
  onEditCategory,
}) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className={styles.checkListContainer}>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id} className={styles.checkList}>
            <div className={styles.contentSection}>
              <div className={styles.todoHeader}>
                {isEditable === todo.id ? (
                  <input
                    type="text"
                    id={`edit-${todo.id}`}
                    className={styles.editContent}
                    onChange={(e) => onEditContent(todo.id, e.target.value)}
                  />
                ) : (
                  <span
                    onDoubleClick={() => onEditDouble(todo.id)}
                    className={styles.todoContent}
                  >
                    {todo.content}
                  </span>
                )}
              </div>
              <div className={styles.timeInfo}>
                {todo.deadline && (
                  <span className={styles.deadline}>
                    마감: {formatDateTime(todo.deadline)}
                  </span>
                )}
                <span className={styles.createdAt}>
                  생성: {formatDateTime(todo.createdAt)}
                </span>
              </div>
            </div>
            <span
              onDoubleClick={() => onEditCategory(todo.id)}
              className={styles.category}
            >
              {todo.category}
            </span>
            <div className={styles.buttonSection}>
              <Button
                variant="complete"
                onClick={() => onToggleTodo(todo.id)}
                title="완료"
              />
              <Button
                variant="delete"
                onClick={() => onDeleteTodo(todo.id)}
                title="삭제"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
