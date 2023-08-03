import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date // opcional, so vai existir se interomper o ciclo
  finishedDate?: Date // opcional, so vai existir se interomper o ciclo
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined // undefined pq pd ser q ainda nao haja ciclo ativo
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptedCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  // string ou null, pq qd o projeto comeca, nao tem nenhum ciclo ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // percorre o array de ciclos e retorna o ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /* explicacao
    ao inves de enviar o setCycles pro context, envia a funcao que manipula o setCycle
  */
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0) // reseta a qtd de segundos q ja passou
  }

  function interruptedCurrentCycle() {
    /* explicacao
      percorre td os ciclos, qd encontrar o ativo, retorna ele com a data atual
      no 'interruptedDate'. Se n for o ciclo ativo, apenas retorna ele no else
    */
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptedCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
