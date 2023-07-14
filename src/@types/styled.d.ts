// arquivo de definicao de tipos typescript
// configurando o styled components p/ o typescript
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

/* criando uma tipagem pro styled components
  sempre que chamarmos o styled-components, o tipo dele vai ser defaultTheme
  estamos adicionando uma funcionalidade nova. Nesse caso estamos dizendo
  quais sao as propriedades do nosso tema
*/
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
