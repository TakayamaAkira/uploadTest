function makeNowTimeString(argObject) {

  // Dateオブジェクトで取得した「月」、「日」、「時」、「分」、「秒」を2桁の文字列で取得する関数式を定義します。
  const convertTwoDigitsString = (function(argNumber) {

    // 渡された引数の数値を文字列に変換します。
    const argString = String(argNumber);

    const twoDigitsString = (function(argString) {

      // 1桁の0～9を2桁の00～09に変換する用のオブジェクトを定義します。
      const numberStringObject = (function(lengthNumber) {
        const temporaryObject = {};
        for (let i = 0; i < lengthNumber; i ++) {
          if (i < 10) {
            temporaryObject[i] = '0' + String(i);
          } else {
            // 何もせず次の処理へ。
          }        
        }
        return temporaryObject;
      }(10)); // end of const numberStringObject


      // 引数が1桁の0～9だった場合、2桁の00～09に変換します。
      // 2桁以上だった場合、そのままです。
      const convertedString = (function(argString, numberStringObject) {
        let temporaryString = '';
        let useReturnString = '';

        Object.keys(numberStringObject).forEach((key) => {
          if (key === argString) {
            temporaryString = numberStringObject[key];
            return;
          } else {
            // 何もせず次の処理へ。
          }
        }); // end of Object.keys(numberStringObject).forEach((key)

        // temporaryStringの内容に応じて条件分岐します。
        if (temporaryString !== '') {
          useReturnString = temporaryString;
        } else {
          useReturnString = argString;
        } // end of if (temporaryString !== '')
      
        return useReturnString;
      }(argString, numberStringObject)); // end of const convertedString

      return convertedString;      
    }(argString)); // end of const twoDigitsString
    
    return twoDigitsString;
  }); // end of const convertTwoDigitsString

  // 現在時刻を再代入するための空文字列を定義します。
  let nowTimeString = '';

  // 年～秒までを取得し、連結させます。
  // （例）2024年1月2日9時0分59秒 → 20240102_09_00_59
  // 年を取得
  nowTimeString += String(argObject.getFullYear());

  // 月を取得
  // getMonthメソッドは「0～11」の配列番号を返すため、今月を取得するために「1」を加算しています。
  nowTimeString += convertTwoDigitsString(argObject.getMonth() + 1);

  // 日を取得
  nowTimeString += convertTwoDigitsString(argObject.getDate()) + '_';

  // 時を取得
  nowTimeString += convertTwoDigitsString(argObject.getHours()) + '_';

  // 分を取得
  nowTimeString += convertTwoDigitsString(argObject.getMinutes()) + '_';

  // 秒を取得
  nowTimeString += convertTwoDigitsString(argObject.getSeconds());

  return nowTimeString;
}