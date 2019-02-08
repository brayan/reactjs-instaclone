import React, { Component } from 'react';
import createHistory from "history/createBrowserHistory";

const history = createHistory({
    basename: "",
    forceRefresh: false
});

export { history }

export default class Login extends Component {

    constructor(props) {
        super(props);
        // this.state = { message: (this.props.location.state.message) !== undefined ? (this.props.location.state.message) : "" };
        this.state = { message: "" };
    }

    submitLogin(event) {
        event.preventDefault();
        this.setState({ message: "" });

        const requestInfo = {
            method: "POST",
            body: JSON.stringify({ login: this.login.value, senha: this.senha.value }),
            headers: new Headers({ 'Content-type': 'application/json' })
        };

        fetch("https://instalura-api.herokuapp.com/api/public/login", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Não foi possível fazer o login");
                }
            })
            .then(token => {
                localStorage.setItem("auth-token", token);
                this.props.history.push("/timeline");
            })
            .catch(error => {
                this.setState({ message: error.message });
            });
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instaclone</h1>
                <span>{this.state.message}</span>
                <form onSubmit={this.submitLogin.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}
