import CardCriatura from "../card-criatura/CardCriatura"
import "./Bestiario.css"
import type { BestiarioType, CardCriaturaType } from "../App";
import Filtro from "../filtro/Filtro";
import { useState } from "react";
import ModalBatalha from "../modal-batalha/ModalBatalha";

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

    const [criaturasSelecionadas, setCriaturasSelecionadas] = useState<CardCriaturaType[]>([]);
    const [resultadoBatalha, setResultadoBatalha] = useState<CardCriaturaType | null>(null);
    const [mostrarModalBatalha, setMostrarModalBatalha] = useState(false);

    const handleSelecionarCriaturaParaBatalha = (criatura: CardCriaturaType) => {
        if (criaturasSelecionadas.length < 2) {
            setCriaturasSelecionadas([...criaturasSelecionadas, criatura]);
        }
    }

    const handleRemoverCriatura = (index: number) => {
        setCriaturasSelecionadas(criaturasSelecionadas.filter((_, i) => i !== index));
    }

    const handleIniciarBatalha = () => {
        if (criaturasSelecionadas.length === 2) {
            const [criatura1, criatura2] = criaturasSelecionadas;
            const peri1 = Number(criatura1.periculosidade);
            const peri2 = Number(criatura2.periculosidade);

            // const diferenca = Math.abs(peri1 - peri2);
            const vencedor = peri1 > peri2 ? criatura1 : peri2 > peri1 ? criatura2 : criaturasSelecionadas[Math.floor(Math.random() * 2)];

            setResultadoBatalha(vencedor);
            setMostrarModalBatalha(true);
        }
    }

    const handleFecharModalBatalha = () => {
        setMostrarModalBatalha(false);
        setCriaturasSelecionadas([]);
        setResultadoBatalha(null);
    }

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
                            onBatalha={handleSelecionarCriaturaParaBatalha}
                            selecionada={criaturasSelecionadas.some(c => c.nome === criatura.nome)}
                        />
                    ))}
                </div>
            </div>

            <button className="btn-abrir-arena" onClick={() => setMostrarModalBatalha(true)}>
                ⚔️ ABRIR ARENA
            </button>

            <ModalBatalha 
                criatura1={criaturasSelecionadas[0] || null}
                criatura2={criaturasSelecionadas[1] || null}
                vencedor={resultadoBatalha}
                mostrar={mostrarModalBatalha}
                onFechar={handleFecharModalBatalha}
                onIniciarBatalha={handleIniciarBatalha}
                onRemover={handleRemoverCriatura}
            />
        </div>
    )
}
