function outputTextCheckResult(outputTargetObject, comparisonTargetObject, nameAttributeObject, resultCheckArray) {

  const afterDataOutputTarget = document.getElementById(outputTargetObject['after']);
  const beforeDataOutputTarget = document.getElementById(outputTargetObject['before']);
  const differenceQuantityOutputTarget = document.getElementById(outputTargetObject['difference']);

  // 結果出力欄をデフォルト状態に戻します。戻さないとチェックするたびにどんどん追加されていってしまいます。
  afterDataOutputTarget.innerHTML = '';
  beforeDataOutputTarget.innerHTML = '';
  differenceQuantityOutputTarget.innerHTML = '';


  const differenceQuantityNumber = (function(resultCheckArray) {
    let temporaryNumber = 0;
    for (let i = 0; i < resultCheckArray.length; i ++) {
      if (resultCheckArray[i] === false) {
        temporaryNumber ++;
      }
    } // end of for (let i = 0; i < resultCheckArray.length; i ++)

    return temporaryNumber;
  }(resultCheckArray)); // end of const differenceQuantityNumber

  if (differenceQuantityNumber !== 0) {
    differenceQuantityOutputTarget.innerHTML = '<div class="font-weight-bold">本文が異なる箇所数：　<span class="span-alert">' + differenceQuantityNumber + '</span></div>';
  } else {
    differenceQuantityOutputTarget.innerHTML = '<div class="font-weight-bold">本文が異なる箇所数：　<span class="span-notification">' + differenceQuantityNumber + '</span></div>';
  }
  

  let forMeLoopIncrementCount = 0;

  for (let i = 0; i < comparisonTargetObject['after'].length; i ++) {
    afterDataOutputTarget.innerHTML += 
      // 頭のタイムスタンプ
      '<div class="display-none">' +
        '<label for="' + nameAttributeObject['after'] + '_' + i + 'head_time_stamp"></label>' +
        '<textarea id="' + nameAttributeObject['after'] + '_' + i + 'head_time_stamp" name="' + nameAttributeObject['after'] + '" class="">' + comparisonTargetObject['after'][i]['mainDataObject']['object_0_headTimeStamp'] + '</textarea>' +
      '</div>' +

      // タブキーとタブキーの間
      '<div class="display-none">' +
        '<label for="' + nameAttributeObject['after'] + '_' + i + 'tab_key"></label>' +
        '<textarea id="' + nameAttributeObject['after'] + '_' + i + 'tab_key" name="' + nameAttributeObject['after'] + '" class="">' + comparisonTargetObject['after'][i]['mainDataObject']['object_1_betweenTabKey'] + '</textarea>' +
      '</div>';

    for (let me = 0; me < comparisonTargetObject['after'][i]['mainDataObject']['object_2_mainTextArray'].length; me ++) {
      if (resultCheckArray[forMeLoopIncrementCount] === true) {
        afterDataOutputTarget.innerHTML += 
          // 相違なし本文
          '<div>' +
            '<label for="' + nameAttributeObject['after'] + '_' + i + '_text_' + me + '"></label>' +
            '<textarea id="' + nameAttributeObject['after'] + '_' + i + '_text_' + me + '" name="' + nameAttributeObject['after'] + '" class="output-textarea" cols="80" rows="4">' + comparisonTargetObject['after'][i]['mainDataObject']['object_2_mainTextArray'][me] + '</textarea>' +
          '</div>';

      } else {
        afterDataOutputTarget.innerHTML += 
          // 相違あり本文
          '<div>' +
            '<label for="' + nameAttributeObject['after'] + '_' + i + '_text_' + me + '"></label>' +
            '<textarea id="' + nameAttributeObject['after'] + '_' + i + '_text_' + me + '" name="' + nameAttributeObject['after'] + '" class="textarea-background-color-pink" cols="80" rows="4">' + comparisonTargetObject['after'][i]['mainDataObject']['object_2_mainTextArray'][me] + '</textarea>' +
          '</div>';
      }
      forMeLoopIncrementCount ++;
    }

    afterDataOutputTarget.innerHTML += 
      // お尻のタイムスタンプ
      '<div class="display-none">' +
        '<label for="' + nameAttributeObject['after'] + '_' + i + 'hip_time_stamp"></label>' +
        '<textarea id="' + nameAttributeObject['after'] + '_' + i + 'hip_time_stamp" name="' + nameAttributeObject['after'] + '" class="">' + comparisonTargetObject['after'][i]['mainDataObject']['object_3_hipTimeStamp'] + '</textarea>' +
      '</div>';
  }

  for (let i = 0; i < comparisonTargetObject['before'].length; i ++) {
    beforeDataOutputTarget.innerHTML += 
      // 編集前本文
      '<div>' + 
        '<div><label for="' + nameAttributeObject['before'] + '_' + i + '"></label></div>' +
        '<div><textarea id="' + nameAttributeObject['before'] + '_' + i + '" name="' + nameAttributeObject['before'] + '" id="checked_before_text_' + i + '" class="output-textarea" cols="80" rows="4">' + comparisonTargetObject['before'][i] + '</textarea></div>' +
      '</div>';
  }

  return;
}