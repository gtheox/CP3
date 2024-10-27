import Image from 'next/image';

export default function Home() {
  return (
    <div className="container">
      <h1 className="header-title">Bem-vindo ao Projeto de Portfólio</h1>
      <p className="description">
      Neste espaço, você encontrará uma coleção dos nossos principais trabalhos realizados durante o curso de Front-End na FIAP.
      </p>

      <div className="authors-grid">

        <div className="author-card">
          <Image
            src="/images/gabriel.jpeg"
            alt="Gabriel Teodoro Gonçalves Rosa"
            width={200}
            height={200}
            className="author-image"
          />
          <h2 className="author-name">Gabriel Teodoro Gonçalves Rosa</h2>
          <p className="author-rm">RM: 555962</p>
        </div>


        <div className="author-card">
          <Image
            src="/images/luka.png"
            alt="Luka Yuiti Ura Shibuya"
            width={200}
            height={200}
            className="author-image"
          />
          <h2 className="author-name">Luka Yuiti Ura Shibuya</h2>
          <p className="author-rm">RM: 558123</p>
        </div>


        <div className="author-card">
          <Image
            src="/images/dudu.jpeg"
            alt="Eduardo Ribeiro Giovaninni"
            width={200}
            height={200}
            className="author-image"
          />
          <h2 className="author-name">Eduardo Ribeiro Giovaninni</h2>
          <p className="author-rm">RM: 555030</p>
        </div>
      </div>
    </div>
  );
}