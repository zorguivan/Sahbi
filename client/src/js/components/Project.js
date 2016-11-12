import React from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import * as ProjectsActions from '../actions/ProjectsActions';

import ProjectHeader from './ProjectHeader';
import Hours from './Hours';
import Todos from './Todos';
// import Search from './Search';

export class Project extends React.Component {
  componentWillMount() {
      ProjectsActions.getProject(this.props.params.id);
  }

    render() {
      let project = this.props.project;

        return (
            <div>
              <ProjectHeader project={project}/>
                <div style={{
                    padding: 50
                }}>
                    <Tabs>
                        <TabList>
                            <Tab><h5><span className="glyphicon glyphicon-time"></span>  Hours</h5></Tab>
                            <Tab><h5><span className="glyphicon glyphicon-list"></span>  To-Do's</h5></Tab>
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
    return {project: state.project, sessions: state.sessions, tracker: state.tracker}
})(Project);

Project.propTypes = {
    params: React.PropTypes.object,
    project: React.PropTypes.object,
}
