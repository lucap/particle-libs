import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Particle from 'particle-api-js';

const AUTH_TOKEN = '930a28831457f828330548d8f83a5b9f10d0bebf';

export default class App extends Component {

    state = {
        currentPageData: [],
        currentPageIndex: 1,
    }

    componentDidMount() {
        this.particle = new Particle();
        this.fetchCurrentPage();
    }

    fetchCurrentPage = () => {
        const {currentPageIndex} = this.state;

        this.particle.listLibraries({auth: AUTH_TOKEN, page: currentPageIndex})
        .then((resp) => {
            this.setState({currentPageData: resp.body.data});
        })
    }

    onNextPage = () => {
        this.updatePage(1)
    }

    onPreviousPage = () => {
        this.updatePage(-1)
    }

    updatePage = (direction) => {
        if (direction == -1 && this.state.currentPageIndex == 1) {
            return;
        }

        this.setState({
            currentPageIndex: this.state.currentPageIndex + direction,
            currentPageData: [],
        }, this.fetchCurrentPage);
    }

    render() {
        const {currentPageData} = this.state;

        return (
            <div className={'main-container'}>
                <div className={'list-container'}>
                    {
                        currentPageData.map((library) => {
                            return (
                                <div
                                    key={library.id}
                                    className={'list-item'}
                                >
                                    {library.attributes.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'pagination-container'}>
                    <span onClick={this.onPreviousPage}>Previous</span>
                    <span> | </span>
                    <span onClick={this.onNextPage}>Next</span>
                </div>
            </div>
        );
    }
}
