function setBeforeDataControl(thisForm, itemName) {

  for (let i = 0; i < thisForm.length; i ++) {

    if (thisForm[i].name === itemName) {

      // テスト環境ではformにテキストを打ち込んだ状態のため半角スペースを削除する処理を行っています。
      // 本番環境では、本文中の半角スペースまで削除してしまうため、絶対に行わないこと！
      // 下記「本番環境ではこっちを使用」を必ず使用すること。
      const replaceBeforeData = thisForm[i].value.replace(/ /g, '');
      const splitNewLineBeforeData = replaceBeforeData.split('\n');
      const beforeDataMenuArray = makeBeforeDataMenuObject(splitNewLineBeforeData);
      const itemObject = JSON.stringify(beforeDataMenuArray);
      setItemToSessionStorage(itemName, itemObject);

      /* 本番環境ではこっちを使用
      const splitNewLineBeforeData = thisForm[i].value.split('\n');
      const beforeDataMenuArray = makeBeforeDataMenuObject(splitNewLineBeforeData);
      const itemObject = JSON.stringify(beforeDataMenuArray);
      setItemToSessionStorage(itemName, itemObject);
      */

    } else {
      // 何もせず次の処理へ。
    }
  }

  return;

}