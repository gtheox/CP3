import { Databases, ID, Query } from "appwrite";
import client from "../../../../lib/appwrite_client";
import { NextResponse } from "next/server";
import { TipoTrabalho } from "@/types/types";

// Criar um objeto DATABASE passando o arquivo de configuração da plataforma.
const database = new Databases(client);

export async function GET() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID as string,
            [Query.orderAsc("$createdAt")]
        );
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { error: "Falha na obtenção das informações: " + error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { nome, matéria, nota, tipodotrabalho, autor } = await request.json();
        const trabalho: TipoTrabalho = { $id: ID.unique(), nome, matéria, nota, tipodotrabalho, autor };
        
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID as string,
            trabalho.$id, // ID único do trabalho
            trabalho
        );

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Falha na criação do trabalho: " + error },
            { status: 500 }
        );
    }
}
