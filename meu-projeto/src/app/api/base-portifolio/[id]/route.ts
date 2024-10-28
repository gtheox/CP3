import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../../lib/appwrite_client";

// Criar um objeto DATABASE passando o arquivo de configuração da plataforma.
const database = new Databases(client);

// Definição de tipo para os parâmetros da rota
type Params = { params: { id: string } };

// GET para recuperar um trabalho pelo ID
export async function GET(request:Request,{params}:{params:{id:string}}) {
  try {

          const response = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID as string, params.id);
      
      return NextResponse.json(response);

  } catch (error) {
      return NextResponse.json({error: "Falha na obtenção da informação."+ error}, {status:500})
  }
}

// PUT para atualizar um trabalho pelo ID
export async function PUT(
  request: Request,
  { params }: Params
) {
  const { id } = params;

  try {
    const trabalho = await request.json();
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID as string,
      id,
      trabalho
    );

    return NextResponse.json({ msg: "Trabalho alterado com sucesso!" });
  } catch (error) {
    console.error("Falha na atualização do trabalho: ", error);
    return NextResponse.json(
      { error: "Falha na atualização do trabalho: " + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE para excluir um trabalho pelo ID
export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = params;

  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID as string,
      id
    );
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Falha na exclusão do trabalho: ", error);
    return NextResponse.json(
      { error: "Falha na exclusão do trabalho: " + (error as Error).message },
      { status: 500 }
    );
  }
}
