function makeAddedPlusOneTimeStampString(argObject) {

  const deepCopiedArgObject = JSON.parse(JSON.stringify(argObject));

  const timeStringObject = (function(deepCopiedArgObject) {

    const temporaryObject = {
      'hoursString': '',
      'minutesString': '',
      'secondsString': '',
    };

    // 「0」～「100」までの数値型の数字を、2桁の文字列型の全角数字に変換する関数式を定義します。
    // 引数argNumberの文字コード番号に「65248」を足すことで文字列型の全角数字にもできますが、最終的に出力するファイルに「Shift_JIS」が絡むことも考慮しこの方式にしました。
    // 「００」～「１００」までで「１００時間５９分５９秒」まで対応できるため、時間数としては十分と考えます。
    // ちなみに、地方自治体議会の連続開催時間は調べても不明でしたが、人間が連続で起きていられる時間の最長記録は「264時間12分」でした。
    // 4日目には白昼夢を見たりするなど正常な状態を維持することはできなかったとのことなので、「4日 = 96時間」を超えて連続開催することはないと考えました。
    const convertAtLeastTwoDigitsFullWidthCharacterString = function(argNumber) {

      const argNumberString = String(argNumber);

      // 文字列を右側から1文字ずつ抜き出し、配列に格納したものを返す関数を定義します。
      // 関数は再帰関数とし、抜き出された側（左側）が2文字以上ある場合、再帰関数を呼び出します。
      // 第3引数stringStorageArrayのデフォルト値は空配列です。
      // 返り値は配列で、第1引数argStringの右側から1文字ずつ、インデックス番号「0」に格納されます。
      const extractionRightOneDigitsString = function(argString, stringStorageArray = []) {

        // 文字列の最も右側の1文字を抜き出し、定数に代入します。
        const endOneString = argString.substring(argString.length - 1, argString.length);
        // 抜き出した右側1文字をstringStorageArrayに格納します。
        stringStorageArray.push(endOneString);

        if (argString.length > 1) {
          const leftDigitsString = argString.substring(0, argString.length - 1);
          extractionRightOneDigitsString(leftDigitsString, stringStorageArray);
        } else {
          // 何もせず次の処理へ。
        }

        // 1文字ずつ文字列を格納した配列をreturnし、処理を終えます。
        return stringStorageArray;
      }; // end of const extractionRightOneDigitsString
          

      const rightToLeftStringArray = extractionRightOneDigitsString(argNumberString);

      const fullCharacterString = (function(rightToLeftStringArray) {

        const zeroToNineStringObject = { 
          '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９', 
        };

        let temporaryString = '';

        for (let i = rightToLeftStringArray.length - 1; i >= 0; i --) {
          Object.keys(zeroToNineStringObject).forEach((key) => {
            if (rightToLeftStringArray[i] === key) {
              temporaryString += zeroToNineStringObject[key];
            }
          });
        }

        if (temporaryString.length < 2) {
          temporaryString = '０' + temporaryString;
        } else {
          // 何もせず次の処理へ。
        }

        return temporaryString;
      }(rightToLeftStringArray)); // end of const fullCharacterString


      return fullCharacterString;
    }; // end of const convertAtLeastTwoDigitsFullWidthCharacterString

    Object.keys(deepCopiedArgObject).forEach((key) => {

      switch (key) {
        case 'hours':
          const hoursString = convertAtLeastTwoDigitsFullWidthCharacterString(deepCopiedArgObject[key]);
          temporaryObject['hoursString'] = hoursString;
          break;

        case 'minutes':
          const minutesString = convertAtLeastTwoDigitsFullWidthCharacterString(deepCopiedArgObject[key]);
          temporaryObject['minutesString'] = minutesString;
          break;

        case 'seconds':
          const secondsString = convertAtLeastTwoDigitsFullWidthCharacterString(deepCopiedArgObject[key]);
          temporaryObject['secondsString'] = secondsString;
          break;

        default:
          console.error('想定と異なる分岐に到達しています。');
          break;
      }

    });

    return temporaryObject;
  }(deepCopiedArgObject));

  // 「☆」で始まるタイムスタンプの形式に加工し、定数に代入します。
  const timeStampString = '☆（' + timeStringObject['hoursString'] + '：' + timeStringObject['minutesString'] + '：' + timeStringObject['secondsString'] + '）';
  
  // 作成したタイムスタンプをreturnし、処理を終えます。
  return timeStampString;
}