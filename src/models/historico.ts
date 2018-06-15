export class Historico {
    date: string;
    ncm:string;
    categoria: string;
    descricao: string;
    valor:string;
    moeda:string;
    peso:string;
    quantidade:string;
    modal:string;
    origem:string;
    destino:string;
}

export class HistoricoList {
    key: string;
    historico: Historico;
}