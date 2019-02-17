import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineAPI from '../api/TimelineAPI';

class Header extends Component {

    onSubmitSearch(event) {
        event.preventDefault();
        this.props.search(this.loginPesquisado.value);
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">InstaClone</h1>

                <form className="header-busca" onSubmit={this.onSubmitSearch.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <span>{this.props.message}</span>
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

const mapDispatchToProps = dispatch => {
    return {
        search: (text) => {
            dispatch(TimelineAPI.searchPictures(text));
        }
    };
}

const mapStateToProps = state => {
    return { message: state.header };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
