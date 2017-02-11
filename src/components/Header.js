import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Header extends React.Component {

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li className="mav-item">
                    <Link to="/signout" className="nav-link"> Sign out</Link>
                </li>
            )
        }

        return [
                <li className="mav-item" key={1}>
                    <Link to="/signin" className="nav-link"> Sign in</Link>
                </li>,
                <li className="mav-item" key={2}>
                    <Link to="/signup" className="nav-link"> Sign up</Link>
                </li>
            ]
    }

    render(){
        return(
            <nav className="navbar navbar-light">
                <Link to="/" className="mavbar-brand"> Redux auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, null)(Header);
