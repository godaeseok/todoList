import React from "react";
import styles from "./button.module.css";

const Button = ({ 
  className = "", 
  variant = "add", 
  onClick,
  title
}) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      title={title}
    >
      {variant === "add" ? "+" : variant === "delete" ? "×" : variant === "complete" ? "✓" : variant === "incomplete" ? "←" : ""}
    </button>    
  );
};

export default Button;