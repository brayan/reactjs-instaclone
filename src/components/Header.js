import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {

    onSubmitSearch(event) {
        event.preventDefault();

        fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisado.value}`)
        .then(response => response.json())
        .then(pictures => {
            PubSub.publish('timeline', pictures);
        });
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">InstaClone</h1>

                <form className="header-busca" onSubmit={this.onSubmitSearch.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                ♡
                  {/*<!--                 ♥--> */}
                                {/*<!--Quem deu like nas minhas fotos?--> */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

        );
    }
}
