import { Usuario } from './usuario';
import { Vendedor } from './vendedor';
import { Product } from './product';

export class Compra{

    constructor(
        public idVenda: number,
        public valorTotal: number,
        public usuario: Usuario,
        public vendedor: Vendedor,
        public produto : Product,
    ){}
}