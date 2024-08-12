function checkTextAfterVsBefore(thisForm, itemNameObject, outputTargetObject) {

  const afterDataOutputTarget = document.getElementById(outputTargetObject['after']);
  const beforeDataOutputTarget = document.getElementById(outputTargetObject['before']);

  const checkedAfterData = setAndCheckAfterData(thisForm, itemNameObject['after']);
  const beforeData = JSON.parse(sessionStorage.getItem('beforeData'));

  const periodSplitAfterTextArray = makeMainTextArray(checkedAfterData, 'after');
  const periodSplitBeforeTextArray = makeMainTextArray(beforeData, 'before');

  outputConsole({ periodSplitAfterTextArray });
  outputConsole({ periodSplitBeforeTextArray });

  // ここは即時関数で宣言したいところ。
  // .lengthも、「-1」したほうがいいのかどうかは要検証。
  const lengthValueArray = [];
  lengthValueArray.push(periodSplitAfterTextArray.length);
  lengthValueArray.push(periodSplitBeforeTextArray.length);
  const resultCheckArray = new Array(Math.max(...lengthValueArray));

  for (let i = 0; i < resultCheckArray.length; i ++) {
    if (periodSplitAfterTextArray[i] && periodSplitBeforeTextArray[i]) { // 編集後と編集前の両方がある場合。
      if (periodSplitAfterTextArray[i] === periodSplitBeforeTextArray[i]) { // 編集後と編集前がイコールの場合。
        resultCheckArray[i] = true;
      } else { // 編集後と編集前がイコールではない場合。
        resultCheckArray[i] = false;
      }
    } else { // 編集後と編集前のいずれかがない場合。
      resultCheckArray[i] = false;
    }
  }

  outputConsole({ resultCheckArray });

  // 結果出力欄をデフォルト状態に戻します。戻さないとチェックするたびにどんどん追加されていってしまいます。
  afterDataOutputTarget.innerHTML = '';
  beforeDataOutputTarget.innerHTML = '';

  for (let i = 0; i < periodSplitAfterTextArray.length; i ++) {
    if (resultCheckArray[i] === true) {
      afterDataOutputTarget.innerHTML += '<div>' + periodSplitAfterTextArray[i] + '</div>';
    } else {
      afterDataOutputTarget.innerHTML += '<div><span class="span-alert">' + periodSplitAfterTextArray[i] + '</span></div>';
    }
  }

  for (let i = 0; i < periodSplitBeforeTextArray.length; i ++) {
    beforeDataOutputTarget.innerHTML += '<div>' + periodSplitBeforeTextArray[i] + '</div>';
  }

  return;
}