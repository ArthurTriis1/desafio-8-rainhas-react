exports.Tabuleiro = class Tabuleiro{
    constructor(valor){
        if(typeof valor !== 'undefined'){
            this.base  = (typeof valor !== 'undefined') ? valor : "padrao";
        }else{
            this.base = [0,1,2,3,4,5,6,7].sort(() =>{ return .5 - Math.random(); })
        }
    }

    ataques(){
        let count = 0;
        for(let x = 0; x <= this.base.length - 1; x++){
            for(let y = x+1; y <= this.base.length - 1; y++){
                if(Math.abs(x - y) == Math.abs(this.base[x] - this.base[y])){
                    count++;
                }
            }
        }
        return count;

    }

    hash(){
       return this.base.reduce((Acumulador, valorAtual, indice) => {
                return Acumulador + (valorAtual * (10**(indice)));
              });
    }

    moves(){
        let count = [];
        for(let x = 0; x <= this.base.length - 1; x++){
            for(let y = x+1; y <= this.base.length - 1; y++){
                let arrTemp = [...this.base];
                let varTemp = arrTemp[x]
                arrTemp[x] = arrTemp[y];
                arrTemp[y] = varTemp;
                count.push(new Tabuleiro(arrTemp))
            }
        }
        return count;
    }

    form(){
        for(let x = 0; x<=8; x++){
            let index = this.base.indexOf(x)
            let text = '|';
            for(let y = 0; y< 8; y++){
                if(y == index){
                    text += "R|"
                }else{
                    text += " |"
                }
            }
            console.log(text)
            text = "|"
            
        }
    }

    table(){
        let table = [];
        for(let x = 0; x<=8; x++){
            let index = this.base.indexOf(x)
            let text = []
            for(let y = 0; y< 8; y++){
                if(y == index){
                    text.push("R")
                }else{
                    text.push("_")
                }
            }
            table.push(text)
            
        }
        console.table(table)
    }
}