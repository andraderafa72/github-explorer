type Repository = {
  name: string;
  description: string;
  html_url: string;
}

type RepositoryItemProps = {
  repository: Repository;
}

import './styles.scss';

export function RepositoryItem({repository}: RepositoryItemProps) {
  return (
    <li className="repository-item">
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>

      <a href={repository.html_url} target="_blank">Acessar Repositório</a>
    </li>
  );
}
