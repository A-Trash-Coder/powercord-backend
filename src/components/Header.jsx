/*
 * Copyright (c) 2018-2020 aetheryx & Bowser65
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '../constants'
import UserContext from './UserContext'
import LoginButton from './LoginButton'

import style from '@styles/header.scss'

import powercordPlug from '@assets/powercord.svg'
import spookycordPlug from '@assets/spookycord.svg'

const Header = () => {
  const isOctober = React.useMemo(() => (new Date().getUTCMonth()) === 9, [])
  const [ opened, setOpened ] = React.useState(false)
  const toggle = React.useCallback(() => setOpened(!opened), [ opened ])
  React.useEffect(() => {
    if (opened) {
      window.addEventListener('click', toggle)
      return () => window.removeEventListener('click', toggle)
    }
  }, [ opened ])

  return (
    <header className={[ style.container, opened && style.opened ].filter(Boolean).join(' ')}>
      <Link to='/'>
        <img src={isOctober ? spookycordPlug : powercordPlug} alt='Powercord Logo'/>
        <h1>Powercord</h1>
      </Link>
      <nav>
        <Link to={Routes.INSTALLATION}>Installation</Link>
        <Link to={Routes.FAQ}>FAQ</Link>
        <Link to={Routes.CONTRIBUTORS}>Contributors</Link>
        <a href={Routes.DICKSWORD} target='_blank' rel='noreferrer'>Discord Server</a>
      </nav>
      <div className={style.account}>
        <UserContext.Consumer>
          {user => <LoginButton user={user}/>}
        </UserContext.Consumer>
      </div>
      <div className={style.burgerking} onClick={toggle}>
        <span/>
        <span/>
        <span/>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
export default React.memo(Header)
