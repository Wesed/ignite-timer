import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 10rem;
  font-weight: bold;
  font-family: 'Roboto Mono', monospace;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    background: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
