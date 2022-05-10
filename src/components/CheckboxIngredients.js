import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function CheckboxIngredients(props) {
  const {
    checkValue,
    modifyItem,
  } = useContext(Context);
  const { ingredient, index, recipeType, recipeId, verifyAllChecked } = props;
  const [checkboxState, setCheckboxState] = useState(
    checkValue(recipeType, recipeId, ingredient),
  );
  const [className, setClassName] = useState('noChecked');

  const handleChecked = () => {
    if (checkboxState === false) {
      setCheckboxState(true);
      setClassName('check');
      modifyItem(recipeType, recipeId, ingredient, 'add');
    }
    if (checkboxState === true) {
      setCheckboxState(false);
      setClassName('noChecked');
      modifyItem(recipeType, recipeId, ingredient, 'remove');
    }
    verifyAllChecked();
  };

  return (
    <div
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        id={ index }
        type="checkbox"
        checked={ checkboxState }
        onChange={ handleChecked }
        name={ ingredient }
      />
      <label
        htmlFor={ index }
        key={ index }
        className={ className }
      >
        { ingredient }
      </label>
    </div>
  );
}

CheckboxIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  verifyAllChecked: PropTypes.func.isRequired,
};

export default CheckboxIngredients;
