import "./CardCriatura.css"
import type { CardCriaturaType } from "../App";

type CardCriaturaProps = {
    criatura: CardCriaturaType;
    onBatalha?: (criatura: CardCriaturaType) => void;
    selecionada?: boolean;
}

export default function CardCriatura({ criatura, onBatalha, selecionada = false }: CardCriaturaProps) {
    return (
        <div className={`card-container ${selecionada ? 'selecionada' : ''}`}>
            <img className="card-imagem" src={`/imgs/${criatura.imagem}`} alt="imagem"></img>
            <h3>{criatura.nome}</h3>
            <div className="card-descricao">
                <p>Periculosidade: {criatura.periculosidade}</p>
                <p className="descricao-criatura">{criatura.descricao}</p>
                <p className="mitologia-criatura">Mitologia: {criatura.mitologia}</p>
            </div>
            {onBatalha && (
                <button className={`btn-batalha-card ${selecionada ? 'selecionada' : ''}`} onClick={() => onBatalha(criatura)}>
                    {selecionada ? '✓ SELECIONADA' : '⚔️ Batalhar'}
                </button>
            )}
        </div>
    )
}