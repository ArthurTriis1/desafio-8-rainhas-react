import React, {useState, useEffect} from 'react';
import './App.css';
import resolveQueens from './scripts/exec.js'
import queen from './assets/queen.png'


function App() {
  
  const [tab, setTab] = useState(getTab(getRandomArray(0,7,8)))
  const [cont, setCont] = useState(8)
  const [win, setWin] = useState(false)

  useEffect(() => {
    function winTest(arr){
   
      if(arr.indexOf(-1) !== -1){
        //console.log('colunas vazias')
        return false
      } 
  
      if(cont !== 8){
        //console.log("n tem 8", cont)
        return false
      }
      //console.log('Oito rainhas marcadas')
  
      let count = 0;
      for(let x = 0; x <= arr.length - 1; x++){
          for(let y = x+1; y <= arr.length - 1; y++){
              if(Math.abs(x - y) == Math.abs(arr[x] - arr[y])){
                  count++;
              }
          }
      }
      return count === 0;
    }
    setWin(winTest(tabToArr(tab)))
    //console.warn(win)
  }, [cont, tab, win])

  function getRandomArray(min, max, qnt) {
    const random = () => Math.floor(Math.random() * (max - min + 1)) + min;
    let array = [];
    for (let i = 0 ; i < qnt ; i++){
      array.push(random());
    }
    return array
  }

  function getTab (array){
    const tab = array.map(number =>{
      let row = [false,false,false,false,false,false,false,false];
      row[number] = true;
      return row;
    })

    return tab;
  }

  function tabToArr(tab){
    const arr = tab.map(item =>{
      return item.indexOf(true)
    })

    return arr
  }

  function tabResolve(){
    setCont(8)
    setTab(getTab(resolveQueens()))

  }

  function tabReset(){
    setTab([...getTab(getRandomArray(0,7,8))])
  }
  
  function changeCell(column, row){
    let newTab = tab;
    if(newTab[column][row]){
      setCont(cont - 1)
    }else{
     setCont(cont + 1)
    }
    newTab[column][row] = !newTab[column][row];
    setTab([...newTab])
    //console.log(tabToArr(tab))

  }



  

  return (
    <div className="App">
       <h1 className="App-title">Desafio das 8 rainhas</h1>

       <h4 className="App-title">O desafio consiste em posicionar 8 rainhas em um tabuleiro 8x8 sem quem elas se ataquem</h4>
       
       <div className="tabQueens">
       {
         tab.map((column, indexc) => (
          <div className="tabColumn" key={indexc}>
            {
              column.map((row, indexr) => (
              <div className="tabCell"
                   key={''+indexc+indexr} 
                   onClick={() => changeCell(indexc, indexr)}
                   >{row && <img src={queen} alt="U"/>	}</div>
              ))
            }
          </div>
         ))
       }           
       </div>
       {
         win ?
         <button className="btResolve winner" onClick={tabReset}>Você ganhou! Clique pra reiniciar...</button>
         :
         <button className="btResolve" onClick={tabResolve}>Gerar uma resolução</button>
         

         
       }
    </div>
  );
}

export default App;
