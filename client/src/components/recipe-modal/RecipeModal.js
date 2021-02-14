import React from 'react';
import Proptypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';

function RecipeModal(props) {
  const { recipe, togglePopUp } = props;
  return (
    <>
      <div className="modal__container" onClick={togglePopUp} onKeyDown={togglePopUp} role="presentation">
        <div className="modal">
          <div className="modal__header">
            <div className="modal__img-container">
              <img className="modal__img" data-testid="recipe-image" src={recipe.img} alt="" />
              <svg className="modal__exit" data-testid="exit-modal-btn" onClick={togglePopUp} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="modal__exit-icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#13182C" />
              </svg>
            </div>
            <div className="modal__recipe">
              <h1>{recipe.title}</h1>
            </div>
            <div className="modal__description">
              <p>
                {' '}
                {recipe.description}
                {' '}
              </p>
            </div>
          </div>
          <div className="modal__ingredients">
            <h3>INGREDIENTS</h3>
            <div className="add__option">
              <ul>
                {
                recipe.ingredients.map((ingredient) => <li key={uuidv1()}>{ingredient}</li>)
                }
              </ul>
            </div>
          </div>
          <div className="modal__instructions">
            <h3>INSTRUCTIONS</h3>
            <div className="add-instruction__option">
              <ol>
                {
                recipe.instructions.map((instruction) => <li key={uuidv1()}>{instruction}</li>)
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RecipeModal.defaultProps = {
  recipe: Proptypes.instanceOf(Object).isRequired,
};

RecipeModal.propTypes = {
  recipe: Proptypes.shape({
    img: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    ingredients: Proptypes.instanceOf(Array).isRequired,
    instructions: Proptypes.instanceOf(Array).isRequired,

  }),
  togglePopUp: Proptypes.func.isRequired,
};

export default RecipeModal;
