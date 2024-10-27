import Link from "next/link";

export default function Menu() {
  return (
    <nav className="menu">
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/portifolio/cp">Checkpoint</Link></li>
            <li><Link href="/portifolio/gs">GlobalSolutions</Link></li>
            <li><Link href="/portifolio/challenge">Challenge Sprints</Link></li>
            <li><Link href= "/portifolio/cad-trabalho">Cadastro</Link></li>
        </ul>
    </nav>
  )
}