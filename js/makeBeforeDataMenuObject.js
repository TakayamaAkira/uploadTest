function makeBeforeDataMenuObject(argArray) {
  
  const deepCopiedArray = JSON.parse(JSON.stringify(argArray));


  const totalBaseLineString = (function(argArray) {

    let resultString = '';

    for (let i = 0; i < argArray.length; i ++) {
      Object.keys(argArray[i]).forEach((key) => {
        resultString += argArray[i][key];   
      });
    }

    return resultString;

  }(deepCopiedArray));


  const replaceTotalBaseLineString = totalBaseLineString.replace(/。/g, '。\t');


  const splitPeriodArray = (function(argString) {

    const resultArray = makeArraySplitTabKey(argString);

    for (let i = 0; i < resultArray.length; i ++) {

      if (resultArray[i] === '') {
        // ここのspliceメソッドはtoSplicedメソッドにしたかったところですが、下記の理由によりspliceメソッドにしています。
        // ・条件分岐で配列の要素の末尾を削除する。
        // ・条件分岐内で宣言した定数及び変数は上部スコープで呼び出せない。
        // ・定数resultArrayはここ以外では使用しないため破壊的メソッドを使用しても問題ない。
        resultArray.splice(i, 1);
      } else {
        // 何もせず次の処理へ。
      }
    }

    return resultArray;

  }(replaceTotalBaseLineString));


  const beforeDataMeneObject = {
    'baseLineStringArray': deepCopiedArray,
    'splitPeriodBeforeData': splitPeriodArray,
  };

  return beforeDataMeneObject;

}