import CardCriatura from "../card-criatura/CardCriatura"
import "./Bestiario.css"
import type { BestiarioType } from "../App";
import Filtro from "../filtro/Filtro";
import { useState } from "react";

export type BestiarioProps = {
    dados: BestiarioType;
}

export default function Bestiario({ dados }: BestiarioProps) {
    const [filtros, setFiltros] = useState<{ // definição do tipo dos filtros
        ordenacao: string;
        periculosidade: number;
        mitologia: string[];
        pesquisa_texto: string;
    }>({ // estado inicial dos filtros
        ordenacao: "nome",
        periculosidade: 100,
        mitologia: [],
        pesquisa_texto: ""
    })

    const criaturasFiltradas = dados.criaturas.filter((criatura) => {
        if (filtros.mitologia.length > 0) {
            if (!filtros.mitologia.includes(criatura.mitologia)) {
                return false;
            }
        }

        if (filtros.pesquisa_texto.length > 0) {
            const texto = filtros.pesquisa_texto.toLowerCase();
            const textoLower = criatura.nome.toLowerCase();
            const descricaoLower = criatura.descricao.toLowerCase();
            if (!textoLower.includes(texto) && !descricaoLower.includes(texto)) {
                return false;
            }
        }

        if (filtros.periculosidade < 100) {
            const periculosidadeNum = Number(criatura.periculosidade);
            const percNum = Number(filtros.periculosidade);
            if (periculosidadeNum > percNum) {
                return false;
            }
        }

        return true;
    }).sort((a, b) => {
        if (filtros.ordenacao === "nome") {
            return a.nome.localeCompare(b.nome);
        }
        if (filtros.ordenacao === "periculosidade") {
            return Number(b.periculosidade) - Number(a.periculosidade);
        }
        if (filtros.ordenacao === "mitologia") {
            return a.mitologia.localeCompare(b.mitologia);
        }
        return 0;
    });

    return (
        <div className="bestiario-container">
            <div className="header-container">
                <div className="gliphos">
                    sadasdasdgasnaslkdjhasdkhasdkjhaslkdhaskldhkashdklahsdklashdklajkhagsakdjgaskjdgaskdaskjdgsajkhdsakjhkjsghdkjhagsdkjgaskdjhgaskjdhgajdgajkdgajkdgajkdgkjhlahwhdljkasdsaasdasasdasasddkljnkbb35jkbkbsajdbklajuwdbkljsabdiuwabdikbs
                </div>
                <div className="titulo-header">
                    <h1>{dados.titulo}</h1>
                    <p>{dados.subtitulo}</p>
                </div>
            </div>
            <div className="main-container">
                <Filtro filtros={filtros} setFiltros={setFiltros} dados={dados.criaturas} />
                <div className="cards-container">
                    {criaturasFiltradas.map((criatura) => (
                        <CardCriatura
                            key={criatura.nome}
                            criatura={criatura}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
