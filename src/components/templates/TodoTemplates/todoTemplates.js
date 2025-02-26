import React, { useState, useEffect } from "react";
import styles from "./todoTemplates.module.css";
import TodoHeader from "../../molecules/TodoHeader/todoHeader";
import TodoInputContainer from "../../molecules/TodoInputContainer/todoInputContainer";
import ListContainer from "../../organisms/ListContainer/listContainer";

function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (01~12)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (01~31)
  const hours = String(date.getHours()).padStart(2, "0"); // 시간 (00~23)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 (00~59)
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초 (00~59)

  // 요일 배열 (0: 일요일 ~ 6: 토요일)
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()]; // 현재 요일 가져오기

  return `${month}/${day} (${dayName}) ${hours}:${minutes}:${seconds}`;
}

const SORT_OPTIONS = {
  DEADLINE: "deadline",
  CREATED: "created",
  CATEGORY: "category",
};

const CATEGORIES = ["업무", "개인", "쇼핑", "공부", "기타"];

export default function TodoTemplates() {
  const [currentTime, setCurrentTime] = useState(() => formatDate(new Date()));
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.CREATED);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isEditable, setIsEditable] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 시계 업데이트
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isEditable) {
      const input = document.getElementById(`edit-${isEditable}`);
      if (input) {
        input.focus();
      }
    }
  }, [isEditable]);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [
      ...prev,
      {
        ...newTodo,
        id: Date.now(),
        isCompleted: false,
        category: newTodo.category || "기타",
      },
    ]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  //할일내용 더블클릭시 변경
  const handleEditDouble = (id) => {
    setIsEditable(id);
  };

  const handleEditContent = (id, content) => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
        onEditControl(id, content);
      }
    };
  
    const handleBlur = () => {
      onEditControl(id, content);
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("blur", handleBlur);
    };
  
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("blur", handleBlur);
  };

  const onEditControl = (id, content) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
    setIsEditable("");
  };

  //할일분류 더블클릭시 변경
  const handleEditCategory = (id, newCategory) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 정렬된 할 일 목록 반환
  const getSortedTodos = () => {
    let filteredTodos =
      selectedCategory === "전체"
        ? todos
        : todos.filter((todo) => todo.category === selectedCategory);

    return filteredTodos.sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.DEADLINE:
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        case SORT_OPTIONS.CATEGORY:
          return a.category.localeCompare(b.category);
        case SORT_OPTIONS.CREATED:
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const sortedTodos = getSortedTodos();
  const checkCount = sortedTodos.filter((todo) => !todo.isCompleted).length;
  const completeCount = sortedTodos.filter((todo) => todo.isCompleted).length;

  return (
    <div className={styles.container}>
      <TodoHeader
        dateTime={currentTime}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={CATEGORIES}
      />
      <div className={styles.categoryButtons}>
        <button
          className={
            selectedCategory === "전체"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("전체")}
        >
          전체
        </button>
        <button
          className={
            selectedCategory === "업무"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("업무")}
        >
          업무
        </button>
        <button
          className={
            selectedCategory === "개인"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("개인")}
        >
          개인
        </button>
        <button
          className={
            selectedCategory === "쇼핑"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("쇼핑")}
        >
          쇼핑
        </button>
        <button
          className={
            selectedCategory === "공부"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("공부")}
        >
          공부
        </button>
        <button
          className={
            selectedCategory === "기타"
              ? styles.categoryBtnActive
              : styles.categoryBtn
          }
          onClick={() => setSelectedCategory("기타")}
        >
          기타
        </button>
      </div>

      <TodoInputContainer onAddTodo={handleAddTodo} categories={CATEGORIES} />

      <ListContainer
        todos={sortedTodos}
        checkCount={checkCount}
        completeCount={completeCount}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onEditContent={handleEditContent}
        onEditDouble={handleEditDouble}
        onEditCategory={handleEditCategory}
        isEditable={isEditable}
        // editingTodo={editingTodo}
        // onStartEditing={startEditing}
      />
    </div>
  );
}