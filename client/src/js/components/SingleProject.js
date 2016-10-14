import React from 'react';
import {Link} from 'react-router';
export default class SingleProject extends React.Component {
    render() {
        return (
            <tr className="SingleProject">
                <td>
                    <Link to={"/project/" + this.props.project.id}>
                        {this.props.project.name}
                    </Link>
                </td>
                <td>{this.props.project.id}</td>
            </tr>
        )
    }
}

SingleProject.propTypes = {
  project: React.PropTypes.object
}
