import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  useEffect(() => {
    fetch(
      'https://react-hooks-ingredients-3b620-default-rtdb.firebaseio.com/ingedients.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadidIngredients = [];
        for (let key in responseData) {
          loadidIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadidIngredients);
      });
  }, []);

  const filteredIngredientsHandler = (filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  };

  const addIngredientHandler = (ingredient) => {
    fetch(
      'https://react-hooks-ingredients-3b620-default-rtdb.firebaseio.com/ingedients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
