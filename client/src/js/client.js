import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/AppStore';
import { Router, Route, hashHistory } from 'react-router';

import Home from './components/Home';
import Project from './components/Project';
import Notes from './components/Notes';




class App extends React.Component{
    componentDidMount(){
        console.log("Main did mount");
    }

    render(){

        return (
          <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Home} />
                <Route path="/project/:id" component={Project} />
                <Route path="/notes/:id" component={Notes} />
            </Router>
          </Provider>
        )
    }
}


ReactDOM.render(<App></App>, document.getElementById('app'));
