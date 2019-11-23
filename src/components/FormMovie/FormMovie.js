import React from 'react';
import './FormMovie.css';

class FormMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster:'',
      comment:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submitForm(e){
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
    const url = 'https://post-a-form.herokuapp.com/api/movies/';

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          console.log(res);
          alert(`Ton film préféré a éré ajouté avec l'ID ${res.id}!`);
        }
      })
      .catch(e => {
        console.error(e);
        alert("Erreur lors de l'ajout du film");
      });

    e.preventDefault();
  }
  render() {
    return (
      <div className="FormMovie">
        <h2>
          <span>Bienvenue sur</span>
          <br />mon-film-prefere.com
        </h2>
        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Quel est ton film préféré ?</legend>
            <div className="form-data">
              <label htmlFor="title">Nom du film</label>
              <input type="text" id='title' name='title' onChange={this.handleChange} value={this.state.title} placeholder='Veuillez saisir le nom du film'/>
            </div>
            <div className="form-data">
              <label htmlFor="title">Poster du film</label>
              <input type="text" id='title' name='poster' onChange={this.handleChange} placeholder="Veuillez saisir l'url du poster du film"/>
            </div>
            <div className="form-data">
              <label htmlFor="title">Pourquoi tu aimes ce film ? Qu'est-ce qui t'a marqué ? ... </label>
              <textarea name="comment" id="comment" onChange={this.handleChange} value={this.state.comment} placeholder="Veuillez saisir un commentaire"></textarea>
            </div>
            <div className="form-data submit">
              <input type="submit" value="Envoyer" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default FormMovie;
