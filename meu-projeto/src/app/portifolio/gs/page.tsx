"use client";
import { TipoTrabalho } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GlobalSolutions() {
    const [listaTrabalhos, setListaTrabalhos] = useState<TipoTrabalho[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("/api/base-portifolio");
        const data = await response.json();
        const { documents } = data;

        // Filtra os trabalhos do tipo "Global Solutions"
        const trabalhosGS = documents.filter((t: TipoTrabalho) => t.tipodotrabalho === "GlobalSolutions");
        setListaTrabalhos(trabalhosGS);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/base-portifolio/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Trabalho excluído com sucesso!");
                chamadaApi();
            }
        } catch (error) {
            console.error("Erro na exclusão do trabalho!", error);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">Trabalhos - Global Solutions</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b border-gray-200 text-left">ID</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">NOME</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">NOTA</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">EDITAR | EXCLUIR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTrabalhos.map((t) => (
                            <tr key={t.$id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">{t.$id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{t.nome}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{t.nota}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Link href={`/portifolio/${t.$id}`} className="text-blue-500 hover:underline">EDITAR</Link> | 
                                    <Link href="#" onClick={() => handleDelete(t.$id)} className="text-red-500 hover:underline">EXCLUIR</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="py-4 px-4 border-t border-gray-200 text-left">
                                <h2 className="text-xl font-bold">Quantidade de registros: {listaTrabalhos.length}</h2>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
