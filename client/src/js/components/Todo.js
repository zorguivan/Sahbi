import React from 'react';
import * as TimeKeeper from '../services/Time_Keeper';
import TodoEditModal from './TodoEditModal';
import * as TodosActions from '../actions/TodosActions';

export default class Todo extends React.Component {
  constructor() {
      super();
      this.state = {}
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
  trackTodo(){
    let track = {};
    let globalCounter = this.props.globalCounter;
    let WeekRange = TimeKeeper.getWeekRange(globalCounter);
    track.project_id = this.props.todo.project_id;
    track.todo_id = this.props.todo.id;
    track.start_range = TimeKeeper.stampDate(WeekRange[0]);
    track.end_range = TimeKeeper.stampDate(WeekRange[1]);
    track.state = 1;
    this.setState({tracked: true});
    TodosActions.trackTodo(track);
    this.props.changeView();
  }
    render() {
      let showTodoEditModal = this.state.showTodoEditModal;

        let todo = this.props.todo;
        if(todo.date.length != 10){
          todo.date = TimeKeeper.startDate(todo.date);
        }
        let repeating = <span className="glyphicon glyphicon-remove"></span>;

        if(todo.end_date){
          if(todo.end_date.length != 10){
            todo.end_date = TimeKeeper.startDate(todo.end_date);
          }

          }
           if(todo.repeat){
             repeating = <span className="glyphicon glyphicon-ok"></span>
           }
           let finishBox =
           <div className="checkbox">
              <label>
                <input type="checkbox" onChange={this.trackTodo.bind(this)}/>
              </label>
            </div>;

          if(this.props.trackHolder || this.state.tracked){
            finishBox = <span className="glyphicon glyphicon-ok"></span>
          }
        return (
            <tr>
            <TodoEditModal showTodoEditModal={showTodoEditModal} closeTodoEditModal={this.closeModal.bind(this, 'showTodoEditModal')} todo={todo}/>
              <td>
                <button type="button" className="btn btn-primary" onClick={this.openModal.bind(this, 'showTodoEditModal')}>
                  {todo.name}
                </button>
              </td>
              <td>{todo.date}</td>
              <td>{todo.day}</td>
              <td>{todo.end_date || '--'}</td>
              <td>{repeating}</td>
              <td>{finishBox}</td>
            </tr>
        );
    }
}

Todo.propTypes = {
    todo: React.PropTypes.object,
    trackHolder: React.PropTypes.number,
    globalCounter: React.PropTypes.number,
    changeView: React.PropTypes.func
}
