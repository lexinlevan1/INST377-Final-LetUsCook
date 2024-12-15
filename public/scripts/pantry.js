const host = window.location.origin;

async function addIngredient(){
    const ingredient = document.getElementById('ingredient').value;
    const quantity = document.getElementById('quantity').value;
  
    console.log(`adding ${quantity} of ${ingredient} to pantry`);
  
    await fetch(`${host}/api/mypantry`, {
      method: 'POST',
      body: JSON.stringify({
        ingredient: ingredient,
        quantity: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  
    })
    .then((res) => res.json())
    await loadPantry();
  
  }
  
  // loads pantry from database into table
  async function loadPantry(){
    const pantryContainer = document.getElementById('pantry-container');
    if (!pantryContainer){
      return;
    }
    await fetch(`${host}/api/mypantry`)
    .then((res) => res.json())
    .then((data) =>{
      const table = document.createElement('table')
      table.setAttribute('id', 'pantry-table')
  
      const tableRow = document.createElement('tr');
  
      const tableHeadingIngredient = document.createElement('th');
      tableHeadingIngredient.innerHTML = 'Ingredient';
      tableRow.appendChild(tableHeadingIngredient);
  
      const tableHeadingQuantity = document.createElement('th');
      tableHeadingQuantity.innerHTML = 'Quantity';
      tableRow.appendChild(tableHeadingQuantity);
  
      table.appendChild(tableRow);
  
      // going through each data item then adding it into table:
      data.forEach((item) =>{
        const pantryRow = document.createElement('tr');
        const pantryIngredient = document.createElement('td');
        const pantryQuantity = document.createElement('td');
        const pantryDelete = document.createElement('td');
  
  
        pantryIngredient.innerHTML = item.ingredient;
        pantryQuantity.innerHTML = item.quantity;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => deleteIngredient(item.ingredient);
  
        pantryDelete.appendChild(deleteButton);
  
  
        pantryRow.appendChild(pantryIngredient);
        pantryRow.appendChild(pantryQuantity);
        pantryRow.appendChild(pantryDelete);
  
        table.appendChild(pantryRow);
      });
  
      const preExistingTable = document.getElementById('pantry-table');
      if (preExistingTable){
        preExistingTable.remove();
      }
  
      document.body.appendChild(table);
    })
  }
  
  async function deleteIngredient(ingredient){
    const confirm = window.confirm(`Are you sure you want to delete ${ingredient}?`);
    if (!confirm){
      return;
    }
  
    await fetch(`${host}/api/mypantry`, {
      method: 'DELETE',
      body: JSON.stringify({
        ingredient: ingredient
    }),
    headers: {
      'Content-Type': 'application/json'
    }
    })
  
    await loadPantry();
  
  }
  
  
  window.onload = loadPantry;