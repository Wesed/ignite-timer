import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // converte o total de minutos em segundos SE tiver um ciclo ativo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // manipulando o intervalo do count down
  useEffect(() => {
    let interval: number
    // se tiver um ciclo ativo
    if (activeCycle) {
      // faz essa operacao a cada 1 segundo
      interval = setInterval(() => {
        /* o differenceInSeconds pega a data atual, a data que o ciclo comecou, 
          e retorna qt tempo passou */
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate), // se for uma string, converte pra date
        )
        // qd for igual, significa q acabou o timer
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval) // qd acaba o ciclo, limpa o timeOut
        } else {
          // se ainda n acabou, continua contando
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    /* qd iniciamos um novo ciclo, o activeCycle muda, e o useEffect 
    soma os 2 ciclos. Pra corrigir, sempre que um novo ciclo for criado, 
    o setInterval q ta ativo eh limpo, descartando o ciclo antigo
    */
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ])

  // armazena qtds segundos ja passou
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // armazena qts minutos cheios tem | floor arredonda pra baixo
  const minutesAmount = Math.floor(currentSeconds / 60)
  // armazena os restos que nao coube em minutesAmountef
  const secondsAmount = currentSeconds % 60

  // qd os campos tiverem menos de 2 caracteres (9, 8...) preenche com 0
  // entao 10, 09, 08 ao inves de 10, 9, 8
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // altera o titulo da pagina c/ o tempo q passou
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Ignite Timer`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span> {/* pega a letra na posicao 0 e 1 */}
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
