import "./CardCriatura.css"
import type { CardCriaturaType } from "../App";

type CardCriaturaProps = {
    criatura: CardCriaturaType;
}

export default function CardCriatura({ criatura }: CardCriaturaProps){
    return(
        <div className="card-container">
            <img className="card-imagem" src={`../../public/imgs/${criatura.imagem}`} alt="imagem"></img>
            <h3>{criatura.nome}</h3>
            <p>Periculosidade: {criatura.periculosidade}</p>
            <p className="descricao-criatura">{criatura.descricao}</p>
            <p className="mitologia-criatura">Mitologia: {criatura.mitologia}</p>
        </div>
    )
}