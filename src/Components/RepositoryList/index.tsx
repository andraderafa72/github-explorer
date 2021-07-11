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
      .then(data => {
        console.log(data)
        const repos: Repository[] = data.map((repo: { name: string; description: string; html_url: string; }) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
        }))
        setRepositories(repos)
      })
      .finally(() => { setIsLoading(false); setSearchValue('') })
  }

  useEffect(() => {
    const regExp = new RegExp(searchValue);

    const result: Repository[] = []

    repositories.forEach(repository => {
      if (repository.name.search(regExp) !== -1) {
        result.push(repository)
      }
    })

    setSearchResult(result)
  }, [searchValue])

  useEffect(() => {
    if (!user) return
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
      <div className="search">
        <input type="text" value={searchValue} placeholder={`Pesquisar repositório em: ${user}`} onChange={e => setSearchValue(e.target.value)} />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" /></svg>
      </div>

      {isLoading ? (
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
