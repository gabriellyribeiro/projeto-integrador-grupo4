export class Usuario{


    constructor(
        public idUsuario:number,
        public nome:string,
        public telefone:string,
        public email:string,
        public senha:string,
        public senhaConf: string,
    ){}

    reset(){
        this.idUsuario = undefined
        this.nome = undefined
        this.telefone = undefined
        this.email = undefined
        this.senha = undefined
        this.senhaConf = undefined
    }
}