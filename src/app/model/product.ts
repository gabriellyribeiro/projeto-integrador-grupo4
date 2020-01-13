export class Product{


    constructor(
        public idProduto : number,
        public titulo: string,
        public detalhes: string,
        public linkfoto: string,
        public preco: number,
        public qtdEstoque: number
    ){}
}