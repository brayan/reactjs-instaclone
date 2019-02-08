import React, { Component } from 'react';

export default class PictureUpdates extends Component {

    onLikePicture(event) {
        event.preventDefault();
        this.props.onLikePicture(this.props.picture.id);
    }

    onSubmitComment(event) {
        event.preventDefault();
        this.props.onSubmitComment(this.props.picture.id, this.comment.value);
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.onLikePicture.bind(this)} className={this.props.picture.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.onSubmitComment.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}
