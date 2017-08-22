import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import LibraryList from './LibraryList';

const AUTH_TOKEN = '930a28831457f828330548d8f83a5b9f10d0bebf';


const main = () => {
    // poor man's routing
    // read the library name from the url
    // we use the fragment for simplicity
    const page = window.location.hash.split('#')[1]
        ? (
            <LibraryList
                authToken={AUTH_TOKEN}
            />
        )
        : (
            <LibraryList
                authToken={AUTH_TOKEN}
            />
        );

    ReactDOM.render(
        page,
        document.getElementById('root')
    );
}

main();
