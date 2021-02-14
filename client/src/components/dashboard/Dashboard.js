/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import '../App.css';
import Post from './Post';
import CreateForm from '../create-recipe/CreateForm';
import { AuthContext } from '../../context/AuthContext';
import { fetchUserPosts, fetchAllPosts } from '../../actions/postActions';

function Dashboard(props) {
  const { isAuthenticated } = useContext(AuthContext);
  const currentUrl = window.location.pathname;

  useEffect(() => {
    if (currentUrl === '/dashboard/global')
      props.fetchAllPosts();
    else if (currentUrl === '/dashboard/my-posts' && isAuthenticated)
      props.fetchUserPosts();
  }, [currentUrl]);

  return (
    <>
      <div className="dashboard">
        <DashboardHeader />
        {currentUrl === '/dashboard/my-posts' && !isAuthenticated
          ? <h2 className="dashboard__unauthenticated-msg">Please Login To See Your Recipes</h2>
          : null}
        <div className="created-posts">
          {currentUrl === '/dashboard/global' && props.allPosts
            ? props.allPosts.map((recipe) => <Post recipe={recipe} key={recipe._id} />)
            : null}
          {currentUrl === '/dashboard/my-posts' && props.userPosts.recipes && isAuthenticated
            ? props.userPosts.recipes.map((recipe) => <Post recipe={recipe} key={recipe._id} />)
            : null}
        </div>
        {currentUrl === '/dashboard/create' ? <CreateForm /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userPosts: state.posts.fetchUsersPosts,
  allPosts: state.posts.fetchAllPosts,
});

Dashboard.propTypes = {
  fetchUserPosts: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  userPosts: PropTypes.instanceOf(Object).isRequired,
  allPosts: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, { fetchAllPosts, fetchUserPosts })(Dashboard);
