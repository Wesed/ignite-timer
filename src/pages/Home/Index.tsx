import { Pause, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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
import { useState } from 'react'

// validacao dos campos do formulario
const newCycleFormValidationSchema = zod.object({
  // a task tem que ser uma string,com no minimo 1 caracter
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    // defaultValues: { minutesAmount: 5 }, // ta dando erro no watch task
  })

  const [stop] = useState(true)

  const handleCreateNewCycle = (data: any) => {
    // data contem os dados do submit do form
    console.log(data)
  }

  const task = watch('task') // monitorando (controlled) o campo task
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
            step={5}
            min={5}
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        {stop ? (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        ) : (
          <StopCountdownButton type="submit">
            <Pause size={24} />
            Interromper
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
