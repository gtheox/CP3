"use client";

import { TipoTrabalho } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadTrabalho() {
  const navigate = useRouter();

  const [trabalho, setTrabalho] = useState<TipoTrabalho>({
    $id: "",
    nome: "",
    matéria: "",
    nota: 0.0,
    tipodotrabalho: "",
    autor: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/base-portifolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trabalho),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Trabalho cadastrado com sucesso!");
        setTrabalho({
          $id: "",
          nome: "",
          matéria: "",
          nota: 0.0,
          tipodotrabalho: "",
          autor: "",
        });
        console.table(data);
        navigate.push("/"); // redirecionar para a página inicial
      }
    } catch (error) {
      console.error("Falha no cadastramento: ", error);
    }
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro de Trabalhos</h1>

      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="cadastro-label">Nome:</label>
            <input
              type="text"
              name="nome"
              value={trabalho.nome}
              placeholder="Digite o nome do trabalho."
              required
              className="cadastro-input"
              onChange={(e) => setTrabalho({ ...trabalho, nome: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="cadastro-label">Matéria:</label>
            <input
              type="text"
              name="matéria"
              value={trabalho.matéria}
              placeholder="Digite a matéria."
              required
              className="cadastro-input"
              onChange={(e) => setTrabalho({ ...trabalho, matéria: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="cadastro-label">Nota:</label>
            <input
              type="number"
              name="nota"
              value={trabalho.nota}
              placeholder="Digite a nota do trabalho."
              required
              className="cadastro-input"
              onChange={(e) => setTrabalho({ ...trabalho, nota: parseFloat(e.target.value) })}
              min={0}
            />
          </div>
          <div className="mb-4">
            <label className="cadastro-label">Tipo do Trabalho:</label>
            <input
              type="text"
              name="tipodotrabalho"
              value={trabalho.tipodotrabalho}
              placeholder="Digite o tipo do trabalho."
              required
              className="cadastro-input"
              onChange={(e) => setTrabalho({ ...trabalho, tipodotrabalho: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="cadastro-label">Autor:</label>
            <input
              type="text"
              name="autor"
              value={trabalho.autor}
              placeholder="Digite o nome do autor."
              required
              className="cadastro-input"
              onChange={(e) => setTrabalho({ ...trabalho, autor: e.target.value })}
            />
          </div>
          <div>
            <button type="submit" className="cadastro-button">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
