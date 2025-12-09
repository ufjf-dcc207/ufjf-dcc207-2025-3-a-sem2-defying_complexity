import type { CardCriaturaType } from "../App";
import CardCriatura from "../card-criatura/CardCriatura";
import "./ModalBatalha.css"

type ModalBatalhaProps = {
    criatura1: CardCriaturaType | null;
    criatura2: CardCriaturaType | null;
    vencedor: CardCriaturaType | null;
    mostrar: boolean;
    onFechar: () => void;
    onIniciarBatalha: () => void;
    onRemover: (index: number) => void;
}

export default function ModalBatalha({ 
    criatura1, 
    criatura2, 
    vencedor, 
    mostrar, 
    onFechar, 
    onIniciarBatalha,
    onRemover 
}: ModalBatalhaProps) {
    
    if (!mostrar) return null;

    const temDuasCriaturas = criatura1 && criatura2;

    return (
        <div className="modal-overlay">
            <div className="modal-batalha">
                <div className="modal-header">
                    <h2>⚔️ ARENA DE BATALHA ⚔️</h2>
                    <button className="btn-fechar" onClick={onFechar}>✕</button>
                </div>

                {!vencedor ? (
                    <div className="modal-content">
                        <div className="criaturas-selecionadas">
                            <div className="lado-esquerdo">
                                {criatura1 ? (
                                    <div className="card-batalha-wrapper">
                                        <CardCriatura criatura={criatura1} />
                                        <button className="btn-remover" onClick={() => onRemover(0)}>Remover</button>
                                    </div>
                                ) : (
                                    <div className="criatura-vazia">
                                        <p>Selecione uma criatura</p>
                                    </div>
                                )}
                            </div>

                            <div className="versus">
                                <span>VS</span>
                            </div>

                            <div className="lado-direito">
                                {criatura2 ? (
                                    <div className="card-batalha-wrapper">
                                        <CardCriatura criatura={criatura2} />
                                        <button className="btn-remover" onClick={() => onRemover(1)}>Remover</button>
                                    </div>
                                ) : (
                                    <div className="criatura-vazia">
                                        <p>Selecione uma criatura</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                className="btn-batalha" 
                                onClick={onIniciarBatalha}
                                disabled={!temDuasCriaturas}
                            >
                                {temDuasCriaturas ? "🔥 INICIAR BATALHA" : "Selecione 2 criaturas"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="resultado-batalha">
                        {/* <div className="vencedor-container"> */}
                            <h3 className="titulo-vencedor">🏆 VENCEDOR 🏆</h3>
                            <CardCriatura criatura={vencedor} />
                        {/* </div> */}
                        <button className="btn-nova-batalha" onClick={onFechar}>Nova Batalha</button>
                    </div>
                )}
            </div>
        </div>
    );
}
