import './styles.scss';

type HeaderProps = {
  user: string;
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeUser: () => void
}
export function Header({  user, onChangeUser, changeUser }: HeaderProps) {
  return (
    <header className="header">
      <div className="background"></div>
      <h1>Github Explorer</h1>

      <div className="change-user">
        <span>Usuário</span>
        <input type="text" value={user} onChange={onChangeUser} />


        <button type="button" onClick={changeUser}>Search</button>
      </div>
    </header>
  )

}
