import React from "react";
import styles from "./todoHeader.module.css";

export default function TodoHeader({
  dateTime,
  // sortBy,
  // onSortChange,
  // selectedCategory,
  // onCategoryChange,
  // categories,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>TO-DO LIST</h1>
      </div>
      <div className={styles.controls}>
        {/* <div className={styles.sortControl}>
          <label>정렬: </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={styles.select}
          >
            <option value="created">생성일순</option>
            <option value="deadline">마감일순</option>
            <option value="category">카테고리순</option>
          </select>
        </div> */}
        <div className={styles.categoryControl}>
          {/* <button>전체</button>
          <button>업무</button>
          <button>개인</button>
          <button>쇼핑</button>
          <button>공부</button>
          <button>기타</button> */}
          {/* <label>카테고리: </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={styles.select}
          >
            <option value="전체">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select> */}
        </div>
      </div>
      <span className={styles.datetime}>{dateTime}</span>
    </div>
  );
}
