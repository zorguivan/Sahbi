import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import * as TodosActions from '../actions/TodosActions';
import * as TimeKeeper from '../services/Time_Keeper';
import {NotificationManager} from 'react-notifications';
import DateInput from './DateInput';

export default class TodoAddModal extends React.Component {
    constructor() {
        super();
        this.state = {
            repeatingEvent: false,
            date: TimeKeeper.stampDate(TimeKeeper.startDate())
        }
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
            state[target] = e.target.value;
        } else {
            state[target] = e;
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
        state[input] = dateStamp
        this.setState(state);
    }

    addTodo() {
        let todo = {};
        todo.name = this.state.eventName || '';
        todo.description = this.state.eventDescription || '';
        todo.project_id = this.props.projectId;
        todo.date = Number(this.state.date) || '';
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        todo.day = days[TimeKeeper.getWeekDay(todo.date)];

        if (this.state.repeatingEvent) {
            todo.end_date = Number(this.state.endDate) || '';
            todo.repeat = Number(this.state.repeat) || 0;
        }

        if(todo.end_date <= todo.start_date && todo.repeat){
          NotificationManager.error('The End date cannot be lower or equal to the start Date in a recurrent event, Please check again');
        } else if(!todo.name || !todo.description || !todo.date){
          NotificationManager.error('Please check your fields before Adding the event');
        } else if(!todo.repeat && (todo.date && todo.end_date) && (todo.date != todo.end_date)){
          NotificationManager.error('Cannot add a recurrent event without repeating box selected. Please check again');
        } else {
          TodosActions.addTodo(todo);
          this.setState({
            repeatingEvent: false,
            date: TimeKeeper.stampDate(TimeKeeper.startDate()),
            eventName: '',
            repeat: '',
            endDate: ''
          });
          this.props.closeTodoAddModal();
        }
    }

    render() {

        let showTodoAddModal = this.props.showTodoAddModal;

        let eventTypedate = <div className="row">
            <label className="col-md-4 control-label">Event Date :
            </label>
            <div className="col-md-8">
                <DateInput onChange={this.setDate.bind(this, 'date')} value={this.state.dateInput} onError={this.onError.bind(this, 'date')}/>
            </div>
        </div>
        if (this.state.repeatingEvent) {
            eventTypedate = <div>
                <div className="row">
                    <label className="col-md-4 control-label">Event Date :
                    </label>
                    <div className="col-md-8">
                        <DateInput onChange={this.setDate.bind(this, 'date')} value={this.state.dateInput} onError={this.onError.bind(this, 'date')}/>
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
                                    <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="1"/>
                                    1 Week
                                </label>
                            </div>
                            <div className="col-md-3">
                                <label className="radio-inline">
                                    <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="2"/>
                                    2 Weeks
                                </label>
                            </div>
                            <div className="col-md-3">
                                <label className="radio-inline">
                                    <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="3"/>
                                    3 Weeks
                                </label>
                            </div>
                            <div className="col-md-3">
                                <label className="radio-inline">
                                    <input type="radio" name="TypeDate" onChange={this._changed.bind(this, 'repeat')} value="4"/>
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
                        <DateInput initialValue={'Empty'} onChange={this.setDate.bind(this, 'endDate')} value={this.state.dateInput} onError={this.onError.bind(this, 'endDate')}/>
                    </div>
                </div>
            </div>
        }
        return (
            <Modal show={showTodoAddModal} bsSize="large" onHide={this.props.closeTodoAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-md-4 control-label">Event Name :</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control" placeholder="Name" ref="todoName" onChange={this._changed.bind(this, 'eventName')}/>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label className="col-md-4 control-label">Event Description :</label>
                        <div className="col-md-8">
                            <textarea className="form-control" ref="Description" rows="10" onChange={this._changed.bind(this, 'eventDescription')}></textarea>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label className="col-md-4 control-label">Event Type :
                        </label>
                        <div className="col-md-8">
                            <select className="form-control" onChange={this.type_changed.bind(this)} ref="eventType" name="eventType">
                                <option value="single">Single Time</option>
                                <option value="repeating">Repeated Event</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    {eventTypedate}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeTodoAddModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.addTodo.bind(this)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
TodoAddModal.propTypes = {
    showTodoAddModal: React.PropTypes.bool,
    closeTodoAddModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    projectId: React.PropTypes.string
}
