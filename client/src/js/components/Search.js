import React from 'react';
import * as TimeKeeper from '../services/Time_Keeper';
import * as SessionsActions from '../actions/SessionsActions';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            month: '01',
            year: new Date().getFullYear()
        }
        this._search = this._search.bind(this);
    }
    _changed(e) {
        if (e.target.name == "month") {
            this.setState({month: e.target.value});
        } else {
            if (e.target.value.length == 4) {
                this.setState({year: e.target.value});
            }
        }
    }
    _search(){
      let stamp = TimeKeeper.stampDate('01/' + this.state.month + '/' + this.state.year);
      let month = (Number(this.state.month) + 1);
      if(month <= 9) month = '0' + month;
      let date = '01/' + month  + '/' + this.state.year;
      let nextStamp = TimeKeeper.stampDate(date);
      let id = this.props.id;
      SessionsActions.search(stamp, nextStamp, id);
    }

    render() {
        let today = new Date().getFullYear();
        return (
            <tr>
                <th>Month</th>
                <th>
                    <select className="form-control" onChange={this._changed.bind(this)} ref="month" name="month">
                        <option value="01">Jan</option>
                        <option value="02">Feb</option>
                        <option value="03">Mar</option>
                        <option value="04">Apr</option>
                        <option value="05">May</option>
                        <option value="06">Jun</option>
                        <option value="07">Jul</option>
                        <option value="08">Aug</option>
                        <option value="09">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                </th>
                <th>Year</th>
                <th><input type="text" className="form-control" defaultValue={today} placeholder="Year" onChange={this._changed.bind(this)} ref="year"/></th>
                <th className="text-center">
                    <button type="button" className="btn btn-success" onClick={this._search}>
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </th>
            </tr>
        )
    }
}

Search.propTypes = {
  id: React.PropTypes.number
}
