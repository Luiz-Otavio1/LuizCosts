import { v4 as uuidv4 } from 'uuid';  // Somente importa a função uuidv4


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Project.module.css";

import Loading from "../Layout/Loading";
import Container from "../Layout/Container";
import Message from '../Layout/Message'
import ProjectForm from "../project/ProjectForm"
import ServiceForm from "../Services/ServiceForm";
import ServiceCard from '../Services/ServiceCard';

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services)

          setMessage('Os projetos estão prontos, o jogo está em andamento. Página carregada, caminho aberto para a próxima conquista.')
          setType('success')
        })
        .catch((err) => console.log(err));
    }, 5000);
  }, [id]);

  function editPost(project) {
    setMessage('')
    // budget validation
    if(project.budget < project.cost) {
        setMessage('O orçamento deve sempre superar as despesas, ou o império desmorona. Ajuste para evitar o colapso.')
        setType('error')
        return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project),
    })
    .then(resp => resp.json())
    .then((data) => {
        setProject(data)

        setShowProjectForm(false)
        setMessage('O orçamento superou as despesas, o império segue firme. A modificação foi um acerto — o caminho está ajustado, o sucesso garantido.')
        setType('success')
    })
    .catch(err => console.log(err))
  }

  function createService(project) {
    setMessage('')

    // Verifique se o projeto tem serviços e se o array de serviços não está vazio
    if (project.services && project.services.length > 0) {
      const lastService = project.services[project.services.length - 1];
  
      // Atribuindo um id único ao último serviço
      lastService.id = uuidv4();
  
      const lastServiceCost = lastService.cost;
      const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
  
      // Validação de orçamento
      if (newCost > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado, verifique o valor do serviço.');
        setType('error');
        project.services.pop(); // Remove o último serviço
        return false;
      }

      // add service costs to project total cost
      project.cost = newCost

      // update project
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      })
        .then((resp) => resp.json())
        .then((data) => {
          setShowServiceForm(false)
        })
        .catch((err) => console.log(err))
    }
  }
  
  function removeService(id, cost) {
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdate
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdate)
        setMessage('Serviço removido com sucesso!')
        setType('success')
      })
      .catch((err) => console.log(err))
    
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                    <p>
                        <span>Categoria:</span> {project.category.name}
                    </p>
                    <p>
                        <span>Total de Orçamento:</span> R${project.budget}
                    </p>
                    <p>
                        <span>Total Utilizado: </span> R${project.cost}
                    </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                    <ServiceForm handleSubmit={createService} btnText={"Adicionar Serviço"} projectData={project}/>
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                {services.length > 0 && (
                  services.map((service) => (
                    <ServiceCard 
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))
                )}
                {services.length === 0 && <p>Não há serviços cadastrados...</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
