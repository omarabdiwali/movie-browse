import { Button } from '@material-ui/core';
import React from 'react';
import ShowDetails from './showDetails';

export default class TrendingData extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      list: null,
      id: false,
      tv: false,
      apiKey: "##################",
    }
    
    document.title = "Movie Screen - Trending";
    this.handleInput = this.handleInput.bind(this);
    this.clickBack = this.clickBack.bind(this);

  }

  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${this.state.apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ list: data.results, loading: false });
  }

  setData(data, type=null) {
    if (type) {
      this.setState({ list: data, loading: true, id:true });
    }
    else {
      this.setState({ list: data, loading: false });
    }
  }

  async handleInput(e) {
    const id = e.target.getAttribute('value');
    const title = e.target.getAttribute('alt');

    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.state.apiKey}&language=en-US`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.title !== title) {
      url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.state.apiKey}&language=en-US`;
      response = await fetch(url);
      data = await response.json()
      this.setState({ tv: true });
    }
    console.log(data);
    this.setData(data, "hi");
    e.preventDefault();
  }

  clickBack() {
    this.setState({ id: false, tv: false });
    this.componentDidMount();
  }


  render() {
    return (
      <div>
        {this.state.id ?
          <div style={{ color: "white" }}>
            <Button onClick={this.clickBack} style={{background: "white", float: "right", marginRight: "20px"}}>Back</Button>
            <ShowDetails data={this.state.list} type={ this.state.tv }/>
          </div>
         : <div></div>}
        {this.state.loading || !this.state.list ? <div>...loading</div> : (
          this.state.list.map((item) => {
            return (
              <Button onClick={this.handleInput} key={ item.id } style={{ marginLeft: "35px", background: "black" }}>
                <img src={item.poster_path ? `http://image.tmdb.org/t/p/w185${item.poster_path}` : "https://media.comicbook.com/files/img/default-movie.png"} alt={item.title} value={item.id} />
              </Button>
            )
          })
        )}
      </div>
    );
  }
}
