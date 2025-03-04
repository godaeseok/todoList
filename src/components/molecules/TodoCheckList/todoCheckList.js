import React, { useState } from "react";
import styles from "./todoCheckList.module.css";
import Button from "../../atoms/button";

export default function TodoCheckList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditContent,
  onEditCategory,
  onEditDeadline,
}) {
  const [editingTodo, setEditingTodo] = useState(null); //  현재 수정 중인 todo 저장
  const [editingCategory, setEditingCategory] = useState(null); //  현재 수정 중인 카테고리 저장
  const [editingDeadline, setEditingDeadline] = useState(null); //  현재 수정 중인 마감기한 저장

  const formatDateTime = (dateString) => {
    if (!dateString) return "없음";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const CATEGORIES = ["업무", "개인", "쇼핑", "공부", "기타"]; // 카테고리 목록

  return (
    <div className={styles.checkListContainer}>
      {/* 내용 수정 */}
      {todos &&
        todos.map((todo) => (
          <div key={todo.id} className={styles.checkList}>
            <div className={styles.contentSection}>
              <div className={styles.todoHeader}>
                {editingTodo?.id === todo.id ? (
                  <input
                    type="text"
                    className={styles.editContent}
                    value={editingTodo.content}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, content: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onEditContent(todo.id, editingTodo.content);
                        setEditingTodo(null);
                      }
                    }}
                    onBlur={() => {
                      if (editingTodo?.content !== todo.content) {
                        onEditContent(todo.id, editingTodo.content);
                      }
                      setEditingTodo(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={() =>
                      setEditingTodo({ id: todo.id, content: todo.content })
                    }
                    className={styles.todoContent}
                  >
                    {todo.content}
                  </span>
                )}
              </div>

              {/* 마감기한 수정 */}
              <div className={styles.timeInfo}>
                {editingDeadline === todo.id ? (
                  <input
                    type="datetime-local"
                    className={styles.deadlineInput}
                    onChange={(e) => onEditDeadline(todo.id, e.target.value)}
                    onBlur={() => setEditingDeadline(null)} // 포커스 해제 시 원래 상태로
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={() => setEditingDeadline(todo.id)}
                    className={styles.deadline}
                  >
                    마감: {formatDateTime(todo.deadline)}
                  </span>
                )}
                <span className={styles.createdAt}>
                  생성: {formatDateTime(todo.createdAt)}
                </span>
              </div>
            </div>

            {/*  카테고리 변경 */}
            <div className={styles.categorySection}>
              {editingCategory === todo.id ? (
                <select
                  value={todo.category}
                  onChange={(e) => onEditCategory(todo.id, e.target.value)}
                  onBlur={() => setEditingCategory(null)} // 포커스 해제 시 원래 상태로
                  autoFocus
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  onDoubleClick={() => setEditingCategory(todo.id)}
                  className={styles.category}
                >
                  {todo.category}
                </span>
              )}
            </div>

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
