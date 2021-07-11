import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';
import { useState, useEffect } from "react";

type Repository = {
  name: string;
  description: string;
  link: string;
}

// https://api.github.com/users/andraderafa72/repos

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/andraderafa72/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        { repositories.map(repository => (
          <RepositoryItem repository={repository} key={repository.name}/>
        ))}
      </ul>
    </section>
  )
}
