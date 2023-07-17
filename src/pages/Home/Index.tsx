import { Pause, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  TaskInput,
  MinutesAmountInput,
  Separator,
  CountdownContainer,
  FormContainer,
  StartCountdownButton,
  StopCountdownButton,
  ErrorInput,
} from './styles'
import { useEffect, useState } from 'react'

// validacao dos campos do formulario
const newCycleFormValidationSchema = zod.object({
  // a task tem que ser uma string,com no minimo 1 caracter
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  // string ou null, pq qd o projeto comeca, nao tem nenhum ciclo ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  /* descricao
    watch: observa os campos CONTROLLED
    formState: armazena infos do form, como os erros
    reset: reseta os campos pro defaultValues
  */
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: '', minutesAmount: 5 }, // ta dando erro no watch task
  })

  // percorre o array de ciclos e retorna o ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // manipulando o intervalo do countDown
  useEffect(() => {
    // se tiver um ciclo ativo
    if (activeCycle) {
      // faz essa operacao a cada 1 segundo
      setInterval(() => {
        setAmountSecondsPassed(
          /* o differenceInSeconds pega a data atual, a data que o ciclo comecou, 
          e retorna qt tempo passou */
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

  const handleCreateNewCycle = (data: any) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  // converte o total de minutos em segundos SE tiver um ciclo ativo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // armazena qtds segundos ja passou
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  // armazena qts minutos cheios tem | floor arredonda pra baixo
  const minutesAmount = Math.floor(currentSeconds / 60)
  // armazena os restos que nao coube em minutesAmount
  const secondsAmount = currentSeconds % 60
  // qd os campos tiverem menos de 2 caracteres (9, 8...) preenche com 0
  // entao 10, 09, 08 ao inves de 10, 9, 8
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  console.log(minutes)

  const task = watch('task')
  // var auxiliar | se task = vazio, isSubmitDisabled sera true
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5} // funciona como o min, nao aceita valor menor que 4
            // min={5}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>

          <ErrorInput>
            {formState.errors.task && <p>{formState.errors.task.message}</p>}

            {formState.errors.minutesAmount && (
              <p>{formState.errors.minutesAmount.message}</p>
            )}
          </ErrorInput>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span> {/* pega a letra na posicao 0 e 1 */}
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycleId ? (
          <StopCountdownButton type="submit">
            <Pause size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
