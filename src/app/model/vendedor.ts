import { Compra } from './compra';
import { Product } from './product';
import { ComprasVendedor } from './comprasVendedor';


export class Vendedor{

    constructor(
        public idVendedor: number,
        public nome: string,
        public email: string,
        public telefone: string,
        public senha: string,
        public senhaConf: string,
        public tipo: string,
        public compra: ComprasVendedor,
        public produto: Product
    ){}
}