import React from "react";
import styles from "./listContainer.module.css";
import TodoCheckHeader from "../../molecules/TodoCheckHeader/todoCheckHeader";
import TodoCompleteHeader from "../../molecules/TodoCompleteHeader/todoCompleteHeader";
import TodoCheckList from "../../molecules/TodoCheckList/todoCheckList";
import TodoCompleteList from "../../molecules/TodoCompleteList/todoCompleteList";

export default function ListContainer({ 
  todos, 
  checkCount, 
  completeCount, 
  onToggleTodo, 
  onDeleteTodo,
  isEditable,
  onEditContent,
  onEditCategory,
  onEditDouble,
  onEditDeadline
}) {
  const uncompletedTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return (
    <div className={styles.listsContainer}>
      <div className={styles.checkHeader}>
        <TodoCheckHeader checkCount={checkCount} />
        <ul className={styles.checkUl}>
          <TodoCheckList 
            todos={uncompletedTodos}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
            onEditContent={onEditContent}
            onEditCategory={onEditCategory}
            isEditable={isEditable}
            onEditDouble={onEditDouble}
            onEditDeadline={onEditDeadline}
          />
        </ul>
      </div>
      <div className={styles.completeHeader}>
        <TodoCompleteHeader completeCount={completeCount} />
        <ul className={styles.completeUl}>
          <TodoCompleteList 
            todos={completedTodos}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
          />
        </ul>
      </div>
    </div>
  );
}
