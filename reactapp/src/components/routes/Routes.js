import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';

import AppContext from '../../context/AppContext';

import Maps from '../../maps/Maps';

import PageNotFound from '../PageNotFound';

function Paths() {
    return (
        <>
            <Switch>
                {/* After updating the history, this will determine which path and page to load */}
                <Route path='/' exact component={Maps} />
                <Route path='/' exact component={Maps} />
                <Route path='/' exact component={Maps} />

                {/* If none of the paths above match, show the page not found */}
                <Route component={PageNotFound} />
            </Switch>
        </>
    );
}

export default Paths;
