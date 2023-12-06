import React from 'react'

import HomeLogo from '../../assets/logo-home.svg'
import CategoryCarousel from '../../components/Categorycarousel'
import { Container, HomeImg } from './styles'

function Home() {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo de home" />
      <CategoryCarousel />
    </Container>
  )
}

export default Home
