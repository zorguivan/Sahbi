import React from 'react';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';

import * as TimeKeeper from '../services/Time_Keeper';
import * as TodosActions from '../actions/TodosActions';
import TodoAddModal from './TodoAddModal';
import Todo from './Todo';

export class Todos extends React.Component {
    constructor() {
        super();
        this.state = {
          currentWeek: TimeKeeper.getWeekNumber(TimeKeeper.startDate()),
          globalCounter: 0
        }
    }
    componentWillMount(){
      TodosActions.getTodos(this.props.projectId);
      let range = TimeKeeper.getWeekRange(0);
      if(this.state.globalCounter){
        range = TimeKeeper.getWeekRange(this.state.globalCounter);
      }
      range = [TimeKeeper.stampDate(range[0]), TimeKeeper.stampDate(range[1])];
      TodosActions.getTrack(range);
    }
    updateTrackView(steps){
      let range = TimeKeeper.getWeekRange(steps);
      range = [TimeKeeper.stampDate(range[0]), TimeKeeper.stampDate(range[1])];
      TodosActions.getTrack(range);
    }
    openModal(name) {
        let state = this.state || {};
        state[name] = true;
        this.setState(state);
    }
    closeModal(name) {
        let state = this.state || {};
        state[name] = false;
        this.setState(state);
    }
    navigate(steps){
      let globalCounter = this.state.globalCounter;
      let state = this.state;
      this.setState({
        currentWeek: state.currentWeek + steps,
        globalCounter: state.globalCounter + steps
      })
      this.updateTrackView(globalCounter + steps);
    }


    filterView(todo){
      let WeekRange = TimeKeeper.getWeekRange(this.state.globalCounter);
      let currentRange = TimeKeeper.getWeekRange(0);
      currentRange = [TimeKeeper.stampDate(currentRange[0]) , TimeKeeper.stampDate(currentRange[1])]
      let decHolder = this.state.globalCounter / Number(todo.repeat) ;
      let endDate = todo.end_date;
      let startDate = todo.date;
      if(endDate && endDate.length == 10) { endDate = Number(TimeKeeper.stampDate(endDate)); } else { endDate = Number(endDate) }
      if(startDate && startDate.length == 10) { startDate = Number(TimeKeeper.stampDate(startDate)); } else { startDate = Number(startDate) }
        if(todo.repeat){
          if(this.state.globalCounter == 0 && startDate < currentRange[0]){
            return false;
          }
          if(this.state.globalCounter != 0 && TimeKeeper.stampDate(WeekRange[0]) < startDate && TimeKeeper.stampDate(WeekRange[1]) > startDate ){
            return true;
          }
          if((this.state.globalCounter != 0  && TimeKeeper.stampDate(WeekRange[0]) < startDate ) || ( endDate  && TimeKeeper.stampDate(WeekRange[1]) > endDate)){
            return false;
          }
          if(this.state.globalCounter != 0  && TimeKeeper.stampDate(WeekRange[0]) < startDate && !endDate){
            return true
          }
          if((!this.state.globalcounter || this.state.globalCounter == 0 ) && startDate >= TimeKeeper.stampDate(WeekRange[0]) && startDate <= TimeKeeper.stampDate(WeekRange[1])){
            return true;
          }
          if(Number(todo.repeat) == 1){
            return true;
          }
          if(Number(todo.repeat) == 2){
              if(Number(todo.repeat) == this.state.globalCounter){ return true }
            return decHolder % 1 == 0
          }
          if(Number(todo.repeat) == 3){
            return decHolder % 1 == 0
          }
          if(Number(todo.repeat) == 4){
            return decHolder % 1 == 0
          }
      } else {
        if(startDate >= TimeKeeper.stampDate(WeekRange[0]) && startDate <= TimeKeeper.stampDate(WeekRange[1])){
          return true;
        }
        return false
      }
    }
    changeView(value){
      if(!value){
        let range = TimeKeeper.getWeekRange(this.state.globalCounter);
        range = [TimeKeeper.stampDate(range[0]), TimeKeeper.stampDate(range[1])];
        TodosActions.getTrack(range);
      }
      this.setState({ controlledView : value });
    }

    render() {
      let buttonView = <div className="col-md-2">
          <button type="button" className="btn btn-default" id="showBtn"  onClick={this.changeView.bind(this, true)}>
              <span className="glyphicon glyphicon-play"></span>Show Unfinshed
          </button>
      </div>;
      if(this.state.controlledView == true){
        buttonView = <div className="col-md-2">
            <button type="button" className="btn btn-default" id="unShowBtn"  onClick={this.changeView.bind(this, false)}>
                <span className="glyphicon glyphicon-stop"></span>Show all
            </button>
        </div>;
      }

      let showTodoAddModal = this.state.showTodoAddModal;
      let WeekRange = TimeKeeper.getWeekRange(this.state.globalCounter);

        let todos = this.props.todos.map((todo) => {
          if(this.filterView(todo)){
            let track = this.props.track;
            let trackHolder = 0;
            track.forEach((trk)=> {
              if(todo.id == trk.todo_id){

                trackHolder = 1;
              }
            })
            if(this.state.controlledView && trackHolder == 1){
              return false;
            } else {
            return <Todo todo={todo} key={todo.id} trackHolder={trackHolder} globalCounter={this.state.globalCounter || 0} changeView={this.changeView.bind(this)}/>
            }
          }
        });
        return (
            <div>
                <TodoAddModal showTodoAddModal={showTodoAddModal} closeTodoAddModal={this.closeModal.bind(this, 'showTodoAddModal')} projectId={this.props.projectId}/>
                <div className="row">
                    <div className="col-md-3">
                        <button type="button" className="btn btn-primary" onClick={this.navigate.bind(this, -1)}>
                            <span className="glyphicon glyphicon-menu-left"></span>Previous
                        </button>
                    </div>
                    <div className="col-md-6 text-center">
                        <h4>
                            <kbd>{WeekRange[0]} - {this.state.currentWeek} - {WeekRange[1]}</kbd>
                        </h4>

                    </div>
                    <div className="col-md-3 text-right">
                        <button type="button" className="btn btn-primary" onClick={this.navigate.bind(this, 1)}>
                            Next<span className="glyphicon glyphicon-menu-right"></span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-2">
                        <button type="button" className="btn btn-success"  onClick={this.openModal.bind(this, 'showTodoAddModal')}>
                            <span className="glyphicon glyphicon-plus"></span> Add Todo
                        </button>
                    </div>
                    <div className="col-md-10"></div>
                </div><br></br><div className="row">
                    {buttonView}
                    <div className="col-md-10"></div>
                </div><br></br>
                <div className="row">
                  <table className="table table-bordered">
                      <thead>
                          <tr className="headerProject">
                              <th>Name</th>
                              <th>Date</th>
                              <th>Day</th>
                              <th>End Date</th>
                              <th>Recurrent</th>
                              <th>Finsihed</th>
                          </tr>
                      </thead>
                      <tbody>
                        {todos}
                      </tbody>
                  </table>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {todos: state.todos, track: state.track}
})(Todos);

Todos.propTypes = {
    projectId: React.PropTypes.string,
    todos: React.PropTypes.array,
    track: React.PropTypes.array
}
