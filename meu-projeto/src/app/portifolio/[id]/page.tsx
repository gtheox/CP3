"use client";

import { TipoTrabalho } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarTrabalho({ params }: { params: { id: string } }) {
  const navigate = useRouter();

  const [trabalho, setTrabalho] = useState<TipoTrabalho>({
    $id: "",
    nome: "",
    matéria: "",
    tipodotrabalho: "",
    nota: 0.0,
    autor: "",
  });

  useEffect(() => {
    const chamadaApi = async () => {
      const response = await fetch(`/api/base-portifolio/${params.id}`);
      const data = await response.json();
      setTrabalho(data);
    };
    chamadaApi();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/base-portifolio/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trabalho),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Trabalho atualizado com sucesso!");
        setTrabalho({
          $id: "",
          nome: "",
          matéria: "",
          tipodotrabalho: "",
          nota: 0,
          autor: "",
        });
        console.table(data);
        navigate.push("/"); 
      }
    } catch (error) {
      console.error("Falha na atualização: ", error);
    }
  };

  return (
    <div>
      <h1>Editar Trabalho</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={trabalho.nome}
              placeholder="Digite o nome do trabalho."
              required
              onChange={(e) => setTrabalho({ ...trabalho, nome: e.target.value })}
            />
          </div>
          <div>
            <label>Matéria:</label>
            <input
              type="text"
              name="matéria"
              value={trabalho.matéria}
              placeholder="Digite a matéria do trabalho."
              required
              onChange={(e) => setTrabalho({ ...trabalho, matéria: e.target.value })}
            />
          </div>
          <div>
            <label>Tipo do Trabalho:</label>
            <input
              type="text"
              name="tipodotrabalho"
              value={trabalho.tipodotrabalho}
              placeholder="Digite o tipo do trabalho."
              required
              onChange={(e) => setTrabalho({ ...trabalho, tipodotrabalho: e.target.value })}
            />
          </div>
          <div>
            <label>Nota:</label>
            <input
              type="number"
              name="nota"
              value={trabalho.nota}
              placeholder="Digite a nota do trabalho."
              required
              onChange={(e) => setTrabalho({ ...trabalho, nota: parseFloat(e.target.value) })}
              min={0}
            />
          </div>
          <div>
            <label>Autor:</label>
            <input
              type="text"
              name="autor"
              value={trabalho.autor}
              placeholder="Digite o nome do autor."
              required
              onChange={(e) => setTrabalho({ ...trabalho, autor: e.target.value })}
            />
          </div>
          <div>
            <button type="submit">Alterar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
