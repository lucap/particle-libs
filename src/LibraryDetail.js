import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Particle from 'particle-api-js';


export default class LibraryDetail extends Component {

    componentDidMount() {
        this.particle = new Particle();
        this.fetchCurrentPage();
    }

    fetchCurrentPage = () => {
        const {authToken} = this.props;
        const {currentPageIndex} = this.state;

        this.particle.listLibraries({auth: authToken, page: currentPageIndex})
        .then((resp) => {
            this.setState({currentPageData: resp.body.data});
        })
    }

    render() {
        const {currentPageData, currentPageIndex} = this.state;

        return (
            <div className={'main-container'}>
                <div>
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
                    <span>Page: {currentPageIndex}</span>
                    <span> | </span>
                    <span
                        onClick={this.onPreviousPage}
                        className={'pagination-controller'}
                    >
                        Previous
                    </span>
                    <span> | </span>
                    <span
                        onClick={this.onNextPage}
                        className={'pagination-controller'}
                    >
                        Next
                    </span>
                </div>
            </div>
        );
    }
}
