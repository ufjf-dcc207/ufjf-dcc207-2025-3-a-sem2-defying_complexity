import CardCriatura from "../card-criatura/CardCriatura"
import "./Bestiario.css"
import type { BestiarioType } from "../App";
import Filtro from "../filtro/Filtro";
import { useState } from "react";

export type BestiarioProps = {
    dados: BestiarioType;
}

const [filtros, setFiltros] = useState({
    periculosidade: [],
    mitologia: [],
    pesquisa_texto: []
})

export default function Bestiario({ dados }: BestiarioProps) {
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
                <Filtro filtros setFiltros/>
                <div className="cards-container">
                    {dados.criaturas.map((criatura) => (
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
