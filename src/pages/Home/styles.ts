import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3.5rem;
  }
`
export const BaseButton = styled.button`
  width: 100%;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;
  transition: 0.1s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
