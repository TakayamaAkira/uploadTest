function makeArraySplitTabKey(arg) {
  
  const resultArray = (function(argItem) {
    
    let result = [];

    if (Array.isArray(argItem)) {
      for (let i = 0; i < argItem.length; i ++) {
        if (argItem[i].indexOf('\t')) {
          result.push(argItem[i].split('\t'));  
        } else {
          // 何もせず次の処理へ。
        }
      }
    } else {
      if (argItem.indexOf('\t')) {
        result = argItem.split('\t');  
      } else {
        // 何もせず次の処理へ。
      }
    }

    return result;  

  }(arg));
  
  return resultArray;

}