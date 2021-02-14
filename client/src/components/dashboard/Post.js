import React, { useState } from 'react';
import Proptypes from 'prop-types';
import RecipeModal from '../recipe-modal/RecipeModal';

export default function Post({ recipe }) {
  const [isPopUp, setPopUp] = useState(false);

  const togglePopUp = () => {
    setPopUp(!isPopUp);
  };

  const postImage = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${recipe.img})`,
  };
  return (
    <>
      <div className="post" data-testid="post-container" onClick={togglePopUp} onKeyDown={togglePopUp} role="button" tabIndex={0}>
        <div className="post__container" data-testid="post-image" style={postImage}>
          <div className="post__description">
            <h1 className="post__name" data-testid="recipe-title">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>
      {isPopUp
        ? <RecipeModal togglePopUp={togglePopUp} recipe={recipe} />
        : null}
    </>
  );
}

Post.propTypes = {
  recipe: Proptypes.instanceOf(Object).isRequired,
};
