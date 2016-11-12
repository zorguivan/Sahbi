import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as TodosActions from '../actions/TodosActions';
import * as TimeKeeper from '../services/Time_Keeper';
import DateInput from './DateInput';
import {NotificationManager} from 'react-notifications';


export default class TodoEditModal extends React.Component {
    constructor() {
        super();
        this.state = {
            repeatingEvent: false,
            date: TimeKeeper.stampDate(TimeKeeper.startDate())
        }
    }
    componentWillReceiveProps(){
      this.setState({todo: this.props.todo})


    }
    type_changed(e) {
        if (e.target.value == 'repeating') {
            this.setState({repeatingEvent: true});
        } else {
            this.setState({repeatingEvent: false});
        }
    }
    _changed(target, e) {
        let state = this.state || {};
        if (e.target.value) {
            state.todo[target] = e.target.value;
        } else if(e.target.value.length == 0){
            state.todo[target] = "";
        } else {
            state.todo[target] = e;
        }
        this.setState(state);
    }
    onError(input) {
        let state = this.state || {};
        state.session[input] = '';
        this.setState(state);
    }
    setDate(input, dateStamp) {
        let state = this.state || {};
        state.todo[input] = dateStamp
        this.setState(state);
    }
    updateTodo(){
      TodosActions.updateTodo(this.state.todo);
      this.props.closeTodoEditModal();
    }

    deleteTodo(){
      let todo = this.state.todo;
      todo.date = TimeKeeper.stampDate(todo.date);
    let currentStamp = TimeKeeper.stampDate(TimeKeeper.startDate());
    if(TimeKeeper.stampDate(todo.date) >= currentStamp){
      TodosActions.deleteTodo(this.state.todo);
    } else {
      NotificationManager.error('The Todo Already started. you cannot stop it.');
    }
    this.props.closeTodoEditModal();

    }

    render() {
        let todo = this.props.todo;
        let stateHolder = this.state.todo;
        if(stateHolder){
          todo = stateHolder
        }
        let showTodoEditModal = this.props.showTodoEditModal;

        let eventTypedate = <div className="row">
            <label className="col-md-4 control-label">Event Date :
            </label>
            <div className="col-md-8">
                <DateInput initialValue={todo.date} onChange={this.setDate.bind(this, 'date')} value={this.state.dateInput} onError={this.onError.bind(this, 'date')}/>
            </div>
        </div>
        if (this.props.todo.repeat) {
            eventTypedate = <div>
                <div className="row">
                    <label className="col-md-4 control-label">Event Date :
                    </label>
                    <div className="col-md-8">
                        <DateInput initialValue={todo.date} onChange={this.setDate.bind(this, 'date')} value={this.state.dateInput} onError={this.onError.bind(this, 'date')}/>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <label className="col-md-4 control-label">Repeat Each :
                    </label>
                    <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-3">
                              <label className="radio-inline">
                                  <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="1" checked={todo.repeat == "1"}/>
                                  1 Week
                              </label>
                          </div>
                          <div className="col-md-3">
                              <label className="radio-inline">
                                  <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="2" checked={todo.repeat == "2"}/>
                                  2 Weeks
                              </label>
                          </div>
                          <div className="col-md-3">
                              <label className="radio-inline">
                                  <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="3" checked={todo.repeat == "3"}/>
                                  3 Weeks
                              </label>
                          </div>
                          <div className="col-md-3">
                              <label className="radio-inline">
                                  <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="4" checked={todo.repeat == "4"}/>
                                  4 Weeks
                              </label>
                          </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <label className="col-md-4 control-label">End Date :
                    </label>
                    <div className="col-md-8">
                        <DateInput initialValue={todo.end_date} onChange={this.setDate.bind(this, 'end_date')} value={this.state.dateInput} onError={this.onError.bind(this, 'end_date')}/>
                    </div>
                </div>
            </div>
        }
        return (
            <Modal show={showTodoEditModal} bsSize="large" onHide={this.props.closeTodoEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-md-4 control-label">Event Name :</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control" value={todo.name || ''} placeholder="Name" ref="todoName" onChange={this._changed.bind(this, 'name')}/>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label className="col-md-4 control-label">Event Description :</label>
                        <div className="col-md-8">
                            <textarea className="form-control" value={todo.description} ref="Description" rows="10" onChange={this._changed.bind(this, 'description')}></textarea>
                        </div>
                    </div>
                    <br></br>
                    {eventTypedate}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="warning" onClick={this.deleteTodo.bind(this)}>Delete</Button>
                    <Button onClick={this.props.closeTodoEditModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.updateTodo.bind(this)}>Update</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
TodoEditModal.propTypes = {
    showTodoEditModal: React.PropTypes.bool,
    closeTodoEditModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    projectId: React.PropTypes.string,
    todo: React.PropTypes.object
}
