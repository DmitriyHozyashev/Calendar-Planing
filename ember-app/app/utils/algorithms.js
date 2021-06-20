import Ember from 'ember';

// Структурирование данных для вычисления.
function _getObjArr(arr, sumWorkArr=0, operationsLeksOrder=0){
  let arrWorksList = new Array();

  arr.forEach(function(item, i, arr) {
    let operationsObj = new Array();
    arr[i].forEach(function(item, i, arr) {
      operationsObj[i]={
        timeStart: 0,
        timeEnd : 0,
        time : item
      };
    });
    let curNumWork = i;
    if (operationsLeksOrder.length > 0) {
      curNumWork = operationsLeksOrder[i]
    }
    arrWorksList[i] = {
      numWork: curNumWork,
      operations: operationsObj,
      valueWork: sumWorkArr[i]
    };
  });

  return arrWorksList;
}

function _getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Вычисление начала и окончания обработок в готовом плане
function _getStartEndTime(arr, m){
  let cols = arr[0].operations.length
  for(let k = 0; k < cols; k++) {
    arr.forEach((item, i, arr) => {
      let prev = new Array();
      for(let j = 0; j < k; j++)
        prev[j] = item.operations[j].timeEnd;
      
      item.operations[k].timeStart = Math.max(arr[i-1] ? arr[i-1].operations[k].timeEnd : 0, _getMaxOfArray(prev));
      item.operations[k].timeEnd = item.operations[k].timeStart + item.operations[k].time;
    });
  };

  return arr;
}

// Вычисление сумарного времени оптимального плана.
// Вызывается после _getStartEndTime
function getSumTime(arr) {
  let n = arr.length;
  let m = arr[0].operations.length;
  return arr[n-1].operations[m-1].timeEnd;
}

// Вычисление суммы операций для изделия.
function _getSumOp(arr) {
  let arrSumOp = new Array();
  
  arr.forEach(function(item, i, arr) {
    arrSumOp[i] = item.reduce(function(sum, current) {
      return sum + current;
    }, 0);
  });
  
  return arrSumOp;
}

// Фронтальный алгоритм.
function frontAlg(arr) {
  let arrWorks = _getSumOp(arr);
  let objArr = _getObjArr(arr, arrWorks);

  objArr.sort((a, b) => {
    if (a.valueWork < b.value_work) return -1;
    if (a.value_work > b.value_work) return 1;
    return 0;
  });

  return _getStartEndTime(objArr);
}

// Эвристика NEH.
function nehAlg(arr,m) {
  let arrWorks = _getSumOp(arr);
  let objArr = _getObjArr(arr, arrWorks);
  
  objArr.sort((a, b) => {
    if (a.valueWork < b.value_work) return -1;
    if (a.value_work > b.value_work) return 1;
    return 0;
  });
  
  _getStartEndTime(objArr);
  let arrSwap = new Array();
  let arrHelp = new Array();

  // начальную сумму нужно считать каждую новую итерацию
  let sum = 0;
  
  arrSwap.push(objArr[0]);
  
  for (let i = 1; i < objArr.length; i++){
    arrHelp = arrSwap;
    arrHelp = JSON.parse(JSON.stringify(arrSwap));
    for (let j=0; j<=i; j++){
      if (j != 0)
        arrHelp.splice(j-1, 1);
      arrHelp.splice(j, 0, objArr[i]);
      if (j == 0) {
        arrSwap = JSON.parse(JSON.stringify(arrHelp));
        _getStartEndTime(arrHelp);
        sum = getSumTime(arrHelp);
      }
      else {
        _getStartEndTime(arrHelp);
        let thisSum = getSumTime(arrHelp);
        if (thisSum < sum) {
          sum = thisSum;
          arrSwap = JSON.parse(JSON.stringify(arrHelp));
        }
      }
    }
  };

  return arrSwap;
}

// Получение символьной строки с номерами операцй, отсортированных по невозрастанию.
// Лексикографический алгоритм.
function _operationsLeks(arr) {
  let operationsNum = new Array();
  for (let i=0; i<arr.length; i++) {

    operationsNum[i] = {
      workNum: i,
      leksString: '',
      opsArr: new Array()
    }

    arr[i].forEach((item, j, arr) => {
      operationsNum[i].opsArr[j] = {
        operation: item,
        index: j
      }
    });

    operationsNum[i].opsArr.sort((a, b) => {
      if (a.operation <= b.operation) return 1;
      if (a.operation > b.operation) return -1;
    });

    let leksStr = "";
    operationsNum[i].opsArr.forEach((item, j, arr) =>{
      leksStr += ".";
      leksStr += (item.index + 1);
    });
    operationsNum[i].leksString = leksStr.slice(1);
  }
  operationsNum.sort((a,b)=>{
    if (a.leksString < b.leksString) return 1;
    if (a.leksString > b.leksString) return -1;
    return 0;
  });
  operationsNum.sort((a,b) => {
    if (a.leksString == b.leksString)
    {
      if (a.opsArr[0].operation < b.opsArr[0].operation) return 1;
      if (a.opsArr[0].operation > b.opsArr[0].operation) return -1;
      return 0;
    }
  });

  let resultArr = new Array();
  operationsNum.forEach((item, i, arr) =>{
    resultArr.push(item.workNum);
  });

  return resultArr;
}

// Перемещение работ согласно заданному порядку.
// Лексикографический алгоритм.
function _replaceWorks(defaultArr, order) {
  let resultArr = new Array();
  order.forEach((item, i, arr) =>{
    resultArr.push(defaultArr[item]);
  });

  return resultArr;
};

// Лексикографический алгоритм.
function leksAlg(arr) {
  let operationsLeksOrder = _operationsLeks(arr);
  let resultArr = _replaceWorks(arr, operationsLeksOrder);
  let objArr = _getObjArr(resultArr, 0, operationsLeksOrder);

  return _getStartEndTime(objArr);
}

// Алгоритм Джонсона
function jonsonAlg(defaultArr) {
  if (defaultArr.length <=2) {
    let arrTop = new Array();
    let arrBottom = new Array();
    for (let j=0; j < defaultArr.length; j++){
      if (defaultArr[j][0] <= defaultArr[j][1])
        arrTop.push(j);
      else
        arrBottom.unshift(j);
    }
    let orderArr = arrTop.concat(arrBottom);
    let resultArr = _replaceWorks(defaultArr, orderArr);
    let objArr = _getObjArr(resultArr);
  
    return _getStartEndTime(objArr);
  }
}

export {
  frontAlg,
  leksAlg,
  nehAlg,
  jonsonAlg,
  getSumTime
};
