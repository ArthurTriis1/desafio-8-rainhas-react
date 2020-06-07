 class OrderArray{

    constructor() {
        this.arr = [];
    }
    
    add(value){
        this.arr.push(value);

        this.arr.sort((a, b) => { 
            return a.ataques() - b.ataques()
        })
    }

    remove(){
        return this.arr.shift()
    }

}

export default OrderArray;