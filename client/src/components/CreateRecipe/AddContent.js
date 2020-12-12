import React from 'react';
import Proptypes from 'prop-types';

export default function AddContent({ saveContent, contentType }) {
  let content;

  const onChange = (event) => {
    content = event.target.value;
  };

<<<<<<< HEAD:client/src/components/create/AddInstruction.js
  const submitInstructionHandler = () => {
    props.submitInstruction(instruction);
    document.getElementById('instruction').value = '';
=======
  const submitContent = () => {
    saveContent(content);
    document.getElementById(contentType).value = '';
>>>>>>> ff43dd3dc2dd323eafc3cfe14f203c5b9d12de5e:client/src/components/CreateRecipe/AddContent.js
  };

  return (
    <div className="add__option">
      <svg className="add__whole" data-testid="add-content-button" onClick={submitContent} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" version="1.1" x="0px" y="0px">
        <path className="add__plus" d="M55,45 L55,30.0000319 C55,27.245531 52.7614237,25 50,25 C47.2441952,25 45,27.2385905 45,30.0000319 L45,45 L30.0000319,45 C27.245531,45 25,47.2385763 25,50 C25,52.7558048 27.2385905,55 30.0000319,55 L45,55 L45,69.9999681 C45,72.754469 47.2385763,75 50,75 C52.7558048,75 55,72.7614095 55,69.9999681 L55,55 L69.9999681,55 C72.754469,55 75,52.7614237 75,50 C75,47.2441952 72.7614095,45 69.9999681,45 L55,45 Z" />
        <path className="add__circle" d="M50,95 C74.8528137,95 95,74.8528137 95,50 C95,25.1471863 74.8528137,5 50,5 C25.1471863,5 5,25.1471863 5,50 C5,74.8528137 25.1471863,95 50,95 L50,95 Z M50,85 C30.6700338,85 15,69.3299662 15,50 C15,30.6700338 30.6700338,15 50,15 C69.3299662,15 85,30.6700338 85,50 C85,69.3299662 69.3299662,85 50,85 L50,85 Z" />
      </svg>
      <textarea
        type="text"
        id={contentType}
        name={contentType}
        placeholder={`input ${contentType}`}
        className="add__input"
        onChange={onChange}
        data-testid="content-text-field"
      />
    </div>
  );
}

<<<<<<< HEAD:client/src/components/create/AddInstruction.js
AddInstruction.propTypes = {
  submitInstruction: Proptypes.func.isRequired,
=======
AddContent.propTypes = {
  saveContent: Proptypes.func.isRequired,
  contentType: Proptypes.string.isRequired,
>>>>>>> ff43dd3dc2dd323eafc3cfe14f203c5b9d12de5e:client/src/components/CreateRecipe/AddContent.js
};
