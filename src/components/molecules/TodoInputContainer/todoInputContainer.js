import React, { useState } from "react";
import styles from "./todoInputContainer.module.css";
import Button from "../../atoms/button";

export default function TodoInputContainer({ onAddTodo, categories }) {
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("기타");
  const [error, setError] = useState("");

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      setError("내용을 입력해주세요!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    
    const newTodo = {
      content: inputValue.trim(), 
      deadline: deadlineValue, 
      createdAt: new Date().toISOString(),
      category: categoryValue
    };
    
    onAddTodo(newTodo);
    resetForm(categoryValue);
  };

  const resetForm = (categoryValue) => {
    setInputValue("");
    setDeadlineValue("");
    setCategoryValue(categoryValue);
    setError("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      handleAddTodo();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.optionsRow}>
        <div className={styles.deadlineInputContainer}>
          <span className={styles.label}>마감기한 :</span>
          <input
            type="datetime-local"
            className={styles.deadlineInput}
            value={deadlineValue}
            onChange={(e) => setDeadlineValue(e.target.value)}
          />
        </div>
        <div className={styles.categoryContainer}>
          <span className={styles.label}>카테고리 :</span>
          <select
            className={styles.categorySelect}
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={`${styles.inputText} ${error ? styles.inputError : ''}`}
            placeholder="할 일 추가하기"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
        <Button variant="add" onClick={handleAddTodo} title="추가" />
      </div>      
    </div>
  );
}
