import React from 'react';
import styled from 'styled-components';

const UserDiv = styled.div`
  width: 10%;
`;

export default function User(props) {
  const user = props.user;

  return (
      <UserDiv className='user-container'>
        <ul>
          <li>{user.username}</li>
          <li><i>{user.email}</i></li>
        </ul>
      </UserDiv>
  );
}