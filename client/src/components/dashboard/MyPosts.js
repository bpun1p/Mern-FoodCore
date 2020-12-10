import React, { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../Utils/LoadingIndicator';
import DashboardHeader from './DashboardHeader';
import '../../assets/styles/Main.css';
import Post from './Post';
import RecipeService from '../../service/RecipeService';

export default function MyPosts() {
  const [RecipeData, setRecipeData] = useState([]);

  useEffect(() => {
    trackPromise(
      RecipeService.getRecipes()
        .then((data) => {
          setRecipeData(data);
        }),
    );
  }, []);

  return (
    <>
      <div className="profile">
        <DashboardHeader />
        <div className="createdposts">
          {RecipeData.length !== 0
            ? RecipeData.receipes.map((recipe) => <Post recipe={recipe} key={uuidv1()} />)
            : null}
          <LoadingIndicator />
        </div>
      </div>
    </>
  );
}
