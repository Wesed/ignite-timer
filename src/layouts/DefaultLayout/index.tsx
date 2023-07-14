/* 
  O defaultLayout carrega tudo aquilo que se repete sempre
  na aplicacao, como header, footer, aside, navbar, etc
*/
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      {/* aq e oq sempre vai mudar de uma pagina pra outra */}
      <Outlet />
    </LayoutContainer>
  )
}
