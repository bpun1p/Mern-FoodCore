/* eslint-disable */
import React from 'react';

import homeNav from '../../assets/images/snippets-from/home/home-nav.png';
import homeNavTest from '../../assets/images/snippets-from/home/home-nav-test.png';
import homeAuthentication from '../../assets/images/snippets-from/home/home-authcontext.png';
import homeAuthenticateService from '../../assets/images/snippets-from/home/home-authservice.png';
import verifyCookie from '../../assets/images/snippets-from/home/home-cookie-extractor.png';
import index from '../../assets/images/snippets-from/home/home-index-route.png';

import signupAuthService from '../../assets/images/snippets-from/entry/entry-authservice.png';
import signupServerRoutes from '../../assets/images/snippets-from/entry/entry-server-routes.png';
import signupForm from '../../assets/images/snippets-from/entry/entry-signup-form.png';
import signupController from '../../assets/images/snippets-from/entry/entry-signup-controller.png';
import signupTest from '../../assets/images/snippets-from/entry/entry-signup-form-test.png';

import getRecipeAction from '../../assets/images/snippets-from/dashboard/dashboard-getRecipe-action.png';
import dashboardNav from '../../assets/images/snippets-from/dashboard/dashboard-nav.png';
import dashboardNavTest from '../../assets/images/snippets-from/dashboard/dashboard-nav-test.png';
import dash from '../../assets/images/snippets-from/dashboard/dashboard.png';
import dashboardTest from '../../assets/images/snippets-from/dashboard/dashboard-test.png';

import postModal from '../../assets/images/snippets-from/recipe-modal/post-modal.png';
import post from '../../assets/images/snippets-from/recipe-modal/post.png';
import postTest from '../../assets/images/snippets-from/recipe-modal/post-test.png';

import createRecipeForm from '../../assets/images/snippets-from/create-form/create-recipe-form.png';
import createRecipeTest from '../../assets/images/snippets-from/create-form/create-recipe-form-test.png';
import createController from '../../assets/images/snippets-from/create-form/create-recipe-controller.png';
import createRecipeAction from '../../assets/images/snippets-from/create-form/create-recipe-action.png';

import codeSnippets from '../../assets/images/snippets-from/code-snippets/code-snippets-js.png';
import codeSnippetsTest from '../../assets/images/snippets-from/code-snippets/code-snippets-test.png';

import home from '../../assets/images/cover-page.png';
import entryPage from '../../assets/images/entry-form.png';
import createForm from '../../assets/images/create-form.png';
import recipeModal from '../../assets/images/recipe-modal.png';
import dashboardRecipes from '../../assets/images/recipes.png';
import codeSnippetsPage from '../../assets/images/codeSnippetsPage.png';

export const appPageImages = {
    'home': home,
    'entry': entryPage,
    'dashboardRecipes': dashboardRecipes,
    'recipeModal': recipeModal,
    'createForm': createForm,
    'codeSnippets': codeSnippetsPage,
}

export const cover = { 
    'NavigationJS': homeNav,
    'NavigationJS.test': homeNavTest,
    'Authentication Provider': homeAuthentication,
    'Authentication Service': homeAuthenticateService,
    'Cookie Verifier': verifyCookie,
    'IndexJS': index,
  }

export const entry = {
    'SignupFormJS': signupForm,
    'SignupFormJS.test': signupTest,
    'Registeration Service': signupAuthService,
    'Registration Server Route': signupServerRoutes,
    'Registration Server Controller': signupController,
  }

export const dashboard = {
    'DashboardJS': dash,
    'DashboardJS.test': dashboardTest,
    'DashboardNavJS': dashboardNav,
    'DashboardNavJS.test': dashboardNavTest,
    'GetRecipes Action': getRecipeAction,
  }

export const posts = {
    'PostJS': post,
    'PostJS.test': postTest,
    'Post Modal': postModal,
  }

export const createRecipe = {
    'CreateRecipeFormJS' : createRecipeForm,
    'CreateRecipeFormJS.test': createRecipeTest,
    'CreateRecipeForm Action': createRecipeAction,
    'CreateRecipeForm Server Controller' : createController,
  }

  export const snippets = {
    'CodeSnippetJS' : codeSnippets,
    'CodeSnippetJS.test' : codeSnippetsTest,
  }