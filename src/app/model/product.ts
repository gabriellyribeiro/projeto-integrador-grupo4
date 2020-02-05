import { Vendedor } from './vendedor';
import { Categoria } from './categoria';
import { Compra } from './compra';

export class Product{


    constructor(
        public idProduto : number,
        public nome: string,
        public preco: number,
        public imgUrl: string,
        public qtd: number,
        public categoria: Categoria,
        public vendedor: Vendedor,
        public compra: Compra
       
    ){}
}