/* ************************************************************************ */
/*
    React Routes - 

        
*/
import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Main } from '../components/Main';
import { Landing } from '../components/pages/Landing';
import { Test1 } from '../components/pages/Test1';
import { Test2 } from '../components/pages/Test2';
import { SignUp } from '../components/pages/signup.js';

import RecipeList from '../components/pages/RecipeList.js';

const router = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
        <Route path='test1' component={Test1} />
        <Route path='test2' component={RecipeList} />
        <Route path='home' component={Landing} />
        <IndexRoute component={Landing} />
        </Route>
    </Router>
);

export { router };
