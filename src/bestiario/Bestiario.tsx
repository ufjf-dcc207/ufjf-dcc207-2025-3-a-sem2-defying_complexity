import CardCriatura from "../card-criatura/CardCriatura"
import "./Bestiario.css"
import type { BestiarioType } from "../App";

export type BestiarioProps = {
    dados: BestiarioType;
}

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
            <div className="cards-container">
                {dados.criaturas.map((criatura) => (
                    <CardCriatura
                        key={criatura.nome}
                        criatura={criatura}
                    />
                ))}
            </div>
        </div>
    )
}
