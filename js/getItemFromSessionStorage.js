function getItemFromSessionStorage(itemName) {
  
  const editedItem = JSON.parse(sessionStorage.getItem(itemName));

  return editedItem;
}