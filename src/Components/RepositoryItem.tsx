type Repository = {
  name: string;
  description: string;
  link: string;
}

type RepositoryItemProps = {
  repository: Repository;
}

export function RepositoryItem({repository}: RepositoryItemProps) {
  return (
    <li>
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>

      <a href={repository.link}>Acessar Repositório</a>
    </li>
  );
}
