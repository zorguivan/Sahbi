import React from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import * as TimeKeeper from '../services/Time_Keeper';


import * as ProjectsActions from '../actions/ProjectsActions';
import * as TodosActions from '../actions/TodosActions';

import ProjectHeader from './ProjectHeader';
import Hours from './Hours';
import Todos from './Todos';
// import Search from './Search';

export class Project extends React.Component {
  componentWillMount() {
    let currentStamp = TimeKeeper.stampDate(TimeKeeper.startDate());
      ProjectsActions.getProject(this.props.params.id);
        TodosActions.getDailyTodos(currentStamp, this.props.params.id);
  }
  componentWillReceiveProps(nextprops) {
    console.log(nextprops);
      if (nextprops.project && nextprops.project.restricted) {
        this.redirectUser();
      }
  }
  redirectUser(){
    document.location.href = 'http://localhost:3000/login';
  }

    render() {
      let project = this.props.project;
      let pointer = "";
      if (this.props.todos && this.props.todos.length > 0){
        pointer = <span className="step">{this.props.todos.length}</span>
      }

        return (
            <div>
              <ProjectHeader project={project}/>
                <div style={{
                    padding: 50
                }}>
                    <Tabs>
                        <TabList>
                            <Tab><h5><span className="glyphicon glyphicon-time"></span>  Hours</h5></Tab>
                            <Tab><h5><span className="glyphicon glyphicon-list"></span>  To-Do's {pointer}</h5></Tab>
                        </TabList>
                        <TabPanel>
                            <Hours projectId={this.props.params.id}/>
                        </TabPanel>
                        <TabPanel>
                            <Todos projectId={this.props.params.id}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {project: state.project, sessions: state.sessions, tracker: state.tracker, todos: state.todos}
})(Project);

Project.propTypes = {
    params: React.PropTypes.object,
    project: React.PropTypes.object,
    todos: React.PropTypes.array
}
