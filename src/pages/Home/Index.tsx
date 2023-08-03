import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StopCountdownButton,
  StartCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

// validacao dos campos do formulario
const newCycleFormValidationSchema = zod.object({
  // a task tem que ser uma string,com no minimo 1 caracter
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptedCurrentCycle, activeCycleId } =
    useContext(CyclesContext)

  /* descricao>
    watch: observa os campos CONTROLLED
    formState: armazena infos do form, como os erros
    reset: reseta os campos pro defaultValues
  */
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: '', minutesAmount: 5 },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  // var auxiliar | se task = vazio, isSubmitDisabled sera true
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        {/* desestrutura no provider oq nao usamos nessa pagina, o register e formState */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycleId ? (
          <StopCountdownButton onClick={interruptedCurrentCycle} type="button">
            <HandPalm size={24} />
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
