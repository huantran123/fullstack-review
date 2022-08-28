import React from 'react';

const Repo = (props) => (
  <div>
    <h4>{props.repo.name}</h4>
    <ul>
      <li key='username'>Owner: {props.repo.username}</li>
      <li key='description'>Description: {props.repo.description}</li>
      <li key='forks'>Forks: {props.repo.forks_count}</li>
      <li key='link'>Link: {props.repo.link}</li>
    </ul>
  </div>
)

export default Repo;