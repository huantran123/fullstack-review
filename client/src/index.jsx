import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // When a user types a GitHub username into the text field, use jQuery's ajax method to send a POST request to /repos
    $.post('/repos', {username: term})
      .done(() => {
        console.log(`${term}'s repos was successfully saved!`);
      })
      .fail((xhr, status, error) => {
        console.log(`${status} - User not found`);
      })
    // $.ajax({
    //   url: '/repos',
    //   type: 'POST',
    //   data: {username: term},
    //   contentType: 'application/json',
    //   success: () => {
    //     console.log(`${term}'s repos was successfully saved!`);
    //   },
    //   error: (err) => {
    //     console.log('Username not found');
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));