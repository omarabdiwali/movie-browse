import { Button, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import React from 'react';
import ShowDetails from './showDetails';

export default class TVData extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      number: Number(window.localStorage.getItem("page1")),
      list: null,
      id: false,
      apiKey: "################"
    }

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clickBack = this.clickBack.bind(this);
  }

  async componentDidMount() {
    if (!this.state.number) {
      window.localStorage.setItem("page1", 1);
      this.setState({ number: 1 });
    }
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${this.state.apiKey}&language=en-US&sort_by=popularity.desc&page=${this.state.number}&timezone=America%2FNew_York&include_null_first_air_dates=false`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.results;
    this.setData(data);
  }

  setData(data, type = null, getting = false) {
    if (type) {
      this.setState({ list: data, loading: true, id:true });
    }
    else {
      this.setState({ list: data, loading: false });
    }
  }
  
  nextPage() {
    if (this.state.number < 20) {
      let page = Number(this.state.number + 1);
      window.localStorage.setItem("page1", page);
      window.location.reload();
    }
  }

  prevPage() {
    if (this.state.number > 1) {
      let page = Number(this.state.number - 1);
      window.localStorage.setItem("page1", page);
      window.location.reload();
    }
  }

  firstPage() {
    if (this.state.number !== 1) {
      this.setState({ number: 1 });
      window.localStorage.setItem("page1", 1);
      window.location.reload();
    }
  }

  lastPage() {
    if (this.state.number !== 20) {
      this.setState({ number: 20 });
      window.localStorage.setItem("page1", 20);
      window.location.reload();
    }
  }
  
  clickBack() {
    this.setState({ id: false });
    this.componentDidMount();
  }

  async handleInput(e) {
    const id = e.target.getAttribute('value');
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.state.apiKey}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    this.setData(data, "hi");
    e.preventDefault();
  }


  render() {
    return (
      <div>
        {this.state.id ?
          <div style={{ color: "white" }}>
            <Button onClick={this.clickBack} style={{background: "white", float: "right", marginRight: "20px"}}>back</Button>
            <ShowDetails data={this.state.list} type={true} />
          </div>
          : <div></div>}
        
        {this.state.loading || !this.state.list ? <div>...loading</div> : (
          this.state.list.map((item) => {
            return (
              <Button onClick={this.handleInput} key={ item.id } style={{ marginLeft: "35px", background: "black" }}>
                <img src={item.poster_path ? `http://image.tmdb.org/t/p/w185${item.poster_path}` : "https://media.comicbook.com/files/img/default-movie.png"} alt={ item.title } value={item.id}/>
              </Button>
            )
          })
        )}

        {!this.state.id ?
          <div>
            <BottomNavigation showLabels style={{ background: "black" }}>
              <BottomNavigationAction label="Previous" value="recents" icon={<ArrowBackIcon />} onClick={this.prevPage} style={{ color: "white" }} />
              <BottomNavigationAction label="Start" value="recents" icon={<FirstPageIcon />} onClick={this.firstPage} style={{ color: "white" }} />
              <BottomNavigationAction label={this.state.number} value="recents" style={{ color: "white" }} disabled={true} />
              <BottomNavigationAction label="End" value="recents" icon={<LastPageIcon />} onClick={this.lastPage} style={{ color: "white" }} />
              <BottomNavigationAction label="Next" value="recents" icon={<ArrowForwardIcon />} onClick={this.nextPage} style={{ color: "white" }} />
            </BottomNavigation>
          </div>
          : "" }
      </div>
    );
  }
}
