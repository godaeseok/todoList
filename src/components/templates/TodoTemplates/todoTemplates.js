import React, { useState, useEffect } from "react";
import styles from "./todoTemplates.module.css";
import TodoHeader from "../../molecules/TodoHeader/todoHeader";
import TodoInputContainer from "../../molecules/TodoInputContainer/todoInputContainer";
import ListContainer from "../../organisms/ListContainer/listContainer";

function formatDate(date) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} (${dayNames[date.getDay()]}) ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}

const SORT_OPTIONS = { DEADLINE: "deadline", CREATED: "created", CATEGORY: "category" };
const CATEGORIES = ["업무", "개인", "쇼핑", "공부", "기타"];

export default function TodoTemplates() {
  const [currentTime, setCurrentTime] = useState(formatDate(new Date()));
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.CREATED);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isEditable, setIsEditable] = useState("");

  useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)), [todos]);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(formatDate(new Date())), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, { ...newTodo, id: Date.now(), isCompleted: false, category: newTodo.category || "기타" }]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  const handleEditContent = (id, content) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, content } : todo)));
    setIsEditable("");
  };

  const handleEditDouble = (id) => setIsEditable(id);

  const handleEditCategory = (id, newCategory) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, category: newCategory } : todo)));
  };

  const handleEditDeadline = (id, newDeadline) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, deadline: newDeadline } : todo)));
  };

  const handleDeleteTodo = (id) => setTodos((prev) => prev.filter((todo) => todo.id !== id));

  const getSortedTodos = () => {
    let filteredTodos = selectedCategory === "전체" ? todos : todos.filter((todo) => todo.category === selectedCategory);
    return filteredTodos.sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.DEADLINE:
          return (!a.deadline ? 1 : !b.deadline ? -1 : new Date(a.deadline) - new Date(b.deadline));
        case SORT_OPTIONS.CATEGORY:
          return a.category.localeCompare(b.category);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  return (
    <div className={styles.container}>
      <TodoHeader dateTime={currentTime} sortBy={sortBy} onSortChange={setSortBy} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={CATEGORIES} />
      <div className={styles.categoryButtons}>
        {["전체", ...CATEGORIES].map((category) => (
          <button key={category} className={selectedCategory === category ? styles.categoryBtnActive : styles.categoryBtn} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <TodoInputContainer onAddTodo={handleAddTodo} categories={CATEGORIES} />
      <ListContainer
        todos={getSortedTodos()}
        checkCount={todos.filter((todo) => !todo.isCompleted).length}
        completeCount={todos.filter((todo) => todo.isCompleted).length}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onEditContent={handleEditContent}
        onEditDouble={handleEditDouble}
        onEditCategory={handleEditCategory}
        isEditable={isEditable}
        onEditDeadline={handleEditDeadline}
      />
    </div>
  );
}
