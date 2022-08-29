import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  getRepos () {
    $.get('/repos')
      .done((data) => {
        this.setState({
          repos: data
        })
        // console.log(this.state.repos);
      })
      .fail(() => {
        console.log('Cannot get repos!')
      })
  }

  componentDidMount() {
    this.getRepos();
  }

  search (term, cb) {
    console.log(`${term} was searched`);
    var getRepo
    // TODO
    // When a user types a GitHub username into the text field, use jQuery's ajax method to send a POST request to /repos
    $.post('/repos', {username: term})
      .done((data) => {
        console.log(`${term}'s repos was successfully saved!`);
        this.getRepos();
      })
      .fail((xhr, status, error) => {
        console.log(`${status} - User not found`);
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <ol>
        {this.state.repos.map(repo => <li key={repo.repo_id}><Repo repo={repo}/></li>)}
      </ol>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));