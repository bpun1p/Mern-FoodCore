/* eslint-disable */
import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ImageCompressor from '../utils/ImageCompressor';
import ToBase64 from '../utils/ToBase64';
import AddContent from './AddContent';
import { postToUserData, postToAllData } from '../../actions/postActions';

function CreateForm(props) {
  const [isDisplay, setDisplay] = useState('');
  const [ingredientSaved, setIngredientSaved] = useState(true);
  const [instructionSaved, setInstructionSaved] = useState(true);
  const [errorForm, setErrorForm] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [isSelectedFile, setSelectedFile] = useState('');
  const [recipe, setRecipe] = useState(
    {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      img: '',
      author: '',
    },
  );
  const { user, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const resetForm = () => {
    setRecipe({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (ingredientsArray.length !== 0 && instructionsArray.length !== 0) {
      props.postToAllData(
        {
          ...recipe,
          ingredients: ingredientsArray,
          instructions: instructionsArray,
          img: isSelectedFile,
          author: user.username,
        },
      );
      props.postToUserData(
        {
          ...recipe,
          ingredients: ingredientsArray,
          instructions: instructionsArray,
          img: isSelectedFile,
          author: user.username,
        },
      );
      resetForm();
      history.push('/dashboard/global');
    } else setErrorForm('Please fill in all fields');
  };

  function imageFileHandler(event) {
    const file = event.target.files[0];
    if (file.type.slice(0, 5) === 'image') {
      ImageCompressor(file).then((compressedFile) => {
        setDisplay(compressedFile);
        ToBase64(compressedFile).then((data) => {
          setSelectedFile(data);
        });
      });
    } else setErrorForm('unable to convert image file');
  }

  const onChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const saveIngredient = (ingredient) => {
    if (ingredient) {
      setIngredientSaved(true);
      setIngredientsArray((ingredients) => [...ingredients, ingredient]);
    } else setIngredientSaved(false);
  };

  const saveInstruction = (instruction) => {
    if (instruction) {
      setInstructionSaved(true);
      setInstructionsArray((instructions) => [...instructions, instruction]);
    } else setInstructionSaved(false);
  };

  return (
    <div>
      <form className="create-form" onSubmit={onSubmit}>
        <div className="create-form__about">
          {!isAuthenticated ? <h2 className="create-form__unauthenticated-msg">Please Login To Create A Recipe</h2> : null}
          <div className="create-form__upload">
            <input
              type="file"
              name="picture"
              id="uploaded-photo"
              onChange={imageFileHandler}
              data-testid="image-input"
            />
            {isSelectedFile !== ''
              ? <img alt="upload" className="image__uploaded" data-testid="displayed-image" src={URL.createObjectURL(isDisplay)} />
              : null}
          </div>
          <div className="create-form__recipe">
            <h2 htmlFor="recipe">Recipe&apos;s Name:</h2>
            <input
              type="text"
              id="recipe-title"
              name="title"
              value={recipe.title}
              onChange={onChange}
              placeholder="Input Name"
              data-testid="recipe-name-text-field"
            />
          </div>
          <br />
          <div className="create-form__description">
            <h2 className="create-form__description-text" htmlFor="description">Description:</h2>
            <textarea
              type="text"
              rows="20"
              id="recipe-description"
              name="description"
              value={recipe.description}
              onChange={onChange}
              placeholder="Input Description"
              data-testid="description-text-field"
            />
          </div>
        </div>
        <div className="create-form__ingredients">
          <h1 className="ingredients__header">INGREDIENTS</h1>
          <ul>
            {ingredientsArray.length !== 0
              ? ingredientsArray.map((ingredient) => <li key={uuidv1()}>{ingredient}</li>)
              : null}
          </ul>
          <AddContent saveContent={saveIngredient} contentType="ingredient" />
          {!ingredientSaved
            ? <p>input valid entry</p>
            : null}
        </div>
        <div className="create-form__instructions">
          <h1>INSTRUCTIONS</h1>
          <ol>
            {instructionsArray.length !== 0
              ? instructionsArray.map((instruction) => <li key={uuidv1()}>{instruction}</li>)
              : null}
          </ol>
          <AddContent saveContent={saveInstruction} contentType="instruction" />
          {!instructionSaved
            ? <p>input valid entry</p>
            : null}
        </div>
        {errorForm ? <p>{errorForm}</p> : null}
        <div className="create-form__submission">
          <button type="submit" className="create-form__submit">Create</button>
        </div>
      </form>
    </div>
  );
}

CreateForm.propTypes = {
  postToUserData: PropTypes.func.isRequired,
  postToAllData: PropTypes.func.isRequired,
};

export default connect(null, { postToUserData, postToAllData })(CreateForm);
