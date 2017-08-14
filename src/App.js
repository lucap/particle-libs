import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Particle from 'particle-api-js';

const AUTH_TOKEN = '930a28831457f828330548d8f83a5b9f10d0bebf';

export default class App extends Component {

    state = {
        currentPage: [],
    }

    componentDidMount() {
        this.particle = new Particle();
         this.particle.listLibraries({auth: AUTH_TOKEN}).then( (resp) => {
            this.setState({currentPage: resp.body.data});
        })
    }

    render() {
        const {currentPage} = this.state;
        return (
            <div>
                {
                    currentPage.map((library) => {
                        return (
                            <div
                                key={library.id}
                            >
                                {library.attributes.name}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
