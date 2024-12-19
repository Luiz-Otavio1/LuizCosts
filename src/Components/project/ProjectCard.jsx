import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
  
  const remove = () => {
    handleRemove(id); // Chama a função handleRemove com o id do projeto
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={styles[category]}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`} className={styles.link_edit}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove} className={styles.button_delete}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
