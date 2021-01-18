import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Col, Input, Menu, Row} from 'antd';
import styled from 'styled-components'

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align:middle;
`;

const AppLayout = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton/>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
        </Col>
        <Col xs={24} md={12}>
          {children}
       </Col>
        <Col xs={24} md={6}>
          <a href="www.naver.com" target="_blank" role="noopner noreferrer">네이버</a>
       </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout
