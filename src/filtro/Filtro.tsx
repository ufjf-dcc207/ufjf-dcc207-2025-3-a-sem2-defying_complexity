import "./Filtro.css"

type FiltroType = {
    ordemacao: string;
    periculosidade: number;
    mitologia: string[];
    pesquisa_texto: string;
};

interface FiltroProps {
    filtros: FiltroType;
    setFiltros: (filtros: FiltroType) => void;
    dados: Array<Record<string, unknown>>;
}
    
export default function Filtro({ filtros, setFiltros, dados }: FiltroProps) {
    const mitologiasArray = Array.from(new Set(dados.map(item => item.mitologia as string)));

    const handleCheckboxChangeMitologia = (e: React.ChangeEvent<HTMLInputElement>, valor: string) => {
        if (e.target.checked) {
            setFiltros({
                ...filtros,
                mitologia: [...filtros.mitologia, valor]
            });
        } else {
            setFiltros({
                ...filtros,
                mitologia: filtros.mitologia.filter(item => item !== valor)
            });
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const texto = e.target.value;
        setFiltros({
            ...filtros,
            pesquisa_texto: texto ? texto : ""
        });
    };
    
    const handleRangeChangePericulosidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = Number(e.target.value);
        setFiltros({
            ...filtros,
            periculosidade: valor
        });
    };

    const handleLimparFiltros = () => {
        setFiltros({ ordemacao: "nome", periculosidade: 100, mitologia: [], pesquisa_texto: "" });

        const inputPesquisa = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (inputPesquisa) {
            inputPesquisa.value = '';
        }

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = false;
        });

        const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement;
        if (rangeInput) {
            rangeInput.value = '100';
        }

        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach((radio) => {
            if((radio as HTMLInputElement).value == 'nome') (radio as HTMLInputElement).checked = true;
            else (radio as HTMLInputElement).checked = false;
        });
    };

    const handleRadioChangeOrdem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros({
            ...filtros,
            ordemacao: e.target.value
        });
    };

    return(
        <div className="filtro-container">
            <h1>Filtros</h1>
            <h2>Ordenar por</h2>
            <div className="ordenacao-opcoes">
                <label>
                    <input type="radio" name="ordenacao" value="nome" onChange={(e)=>{handleRadioChangeOrdem(e)}}/>
                    Nome
                </label>
                <label>
                    <input type="radio" name="ordenacao" value="periculosidade" onChange={(e)=>{handleRadioChangeOrdem(e)}}/>
                    Periculosidade
                </label>
                <label>
                    <input type="radio" name="ordenacao" value="mitologia" onChange={(e)=>{handleRadioChangeOrdem(e)}}/>
                    Mitologia
                </label>
            </div>

            <h2>Pesquisa</h2>
            <input
                type="text"
                placeholder="Buscar por nome ou descrição"
                onChange={(e) => { handleSearchChange(e) }}
            />
            <h2>Mitologia</h2>
            {mitologiasArray.map((mitologia) => (
                <div key={mitologia}>
                    <input
                        type="checkbox"
                        name={`mitologia-${mitologia}`}
                        id={`mitologia-${mitologia}`}
                        onChange={(e) => handleCheckboxChangeMitologia(e, mitologia)}
                    />
                    <label htmlFor={`mitologia-${mitologia}`}>{mitologia}</label>
                </div>
            ))}

            <h2>Periculosidade Máxima</h2>
            <input type="range" value={filtros.periculosidade} onChange={(e) => handleRangeChangePericulosidade(e)}/>
            <span>{filtros.periculosidade}</span>
            <button onClick={handleLimparFiltros}>Limpar Filtros</button>
        </div>
    )
}