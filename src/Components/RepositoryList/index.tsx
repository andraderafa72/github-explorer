import { RepositoryItem } from "../RepositoryItem";
import { Header } from '../Header'

import './styles.scss';
import { useState, useEffect } from "react";

type Repository = {
  name: string;
  description: string;
  html_url: string;
}

// https://api.github.com/users/andraderafa72/repos

export function RepositoryList() {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [user, setUser] = useState('andraderafa72');

  const [searchResult, setSearchResult] = useState<Repository[]>([]);

  function handleSubmit() {
    setIsLoading(true)
    const url = `https://api.github.com/users/${user}/repos`
    fetch(url)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      const repos: Repository[] = data.map((repo: { name: string; description: string; html_url: string; }) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
      }))
      setRepositories(repos)
    })
    .finally(() => {setIsLoading(false); setSearchValue('')})
  }

  useEffect(() => {
    const regExp = new RegExp(searchValue);

    const result: Repository[] = []

    repositories.forEach(repository => {
      if(repository.name.search(regExp) !== -1){
        result.push(repository)
      }
    })

    setSearchResult(result)
  }, [searchValue])

  useEffect(() => {
    if(!user) return
    const url = `https://api.github.com/users/${user}/repos`
    fetch(url)
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <Header
        user={user}
        onChangeUser={e => setUser(e.target.value)}
        changeUser={handleSubmit}
      />

      <h2>Lista de repositórios</h2>
      <input type="text" value={searchValue} placeholder={`Pesquisar repositório em: ${user}`} onChange={e => setSearchValue(e.target.value)} />

      { isLoading ? (
        <div className="loading-wrapper">
          <div className="loading"></div>
        </div>
      ) : (
      <ul>
        {!searchResult[0] ? repositories.map(repository => (
          <RepositoryItem repository={repository} key={repository.name} />
        )) : searchResult.map(repository => (
          <RepositoryItem repository={repository} key={repository.name} />
        ))}
      </ul>
      )}
    </section>
  )
}
