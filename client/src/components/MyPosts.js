import React, { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './utils/LoadingIndicator';
import DashBoardHeader from './dashboard/DashBoardHeader';
import '../assets/styles/Main.css';
import Post from './dashboard/Post';
import ReceipeService from '../service/ReceipeService';

function MyPosts() {
  const [ReceipeData, setReceipeData] = useState([]);

  useEffect(() => {
    trackPromise(
      ReceipeService.getReceipes()
        .then((data) => {
          setReceipeData(data);
        }),
    );
  }, []);

  return (
    <>
      <div className="profile">
        <DashBoardHeader />
        <div className="createdposts">
          {ReceipeData.length !== 0
            ? ReceipeData.receipes.map((receipe) => <Post receipe={receipe} key={uuidv1()} />)
            : null}
          <LoadingIndicator />
        </div>
      </div>
    </>
  );
}

export default MyPosts;
