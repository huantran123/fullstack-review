import React from 'react';

const Repo = (props) => (
  <div>
    <a href={props.repo.link} target='_blank'>
      <h4>{props.repo.name}</h4>
    </a>
    <ul>
      <li key='username'>Owner: {props.repo.username}</li>
      <li key='description'>Description: {props.repo.description}</li>
      <li key='forks'>Forks: {props.repo.forks_count}</li>
      <li key='watchers'>Watchers: {props.repo.watchers}</li>
    </ul>
  </div>
)

export default Repo;