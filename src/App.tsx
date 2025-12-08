import Bestiario from "./bestiario/Bestiario";
import "./App.css";
import json from "./bd.json"

export type BestiarioType = {
  titulo: string;
  subtitulo: string;
  criaturas: Array<CardCriaturaType>;
};

export type CardCriaturaType = {
  nome: string;
  imagem: string;
  descricao: string;
  periculosidade: number;
  mitologia: string;
  fonte_img: string;
};



const data = json as BestiarioType;

export default function App() {
  return (
    <>
      <Bestiario dados={data} />
    </>
  )
}
