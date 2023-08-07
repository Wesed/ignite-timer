import { Cycle } from './reducer'

/* explicacao desse arquivo
  nada mais e que pra facilitar futuramente na hora de chamar 
  as funcoes do reducer. 'oq o addNewCycle recebe mesmo?'
  com essa funcao, o proprio typescript vai dizer o parametro que espera
 */

/* explicacao actiontypes
  auxilia na hora de chamar as funcoes novamente, pois o Action.Types
  traz a lista de todas as funcoes existentes. E caso precise alterar o nome,
  alterar num unico lugar.
*/
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptedCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
