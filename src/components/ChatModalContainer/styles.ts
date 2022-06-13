import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

export const Header = styled.div`
  width: 100%;
  height: 3rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #56BBA9;
  transition: filter 0.3s;

  svg {
    font-size: 1.25rem;
    color: #FFFFFF;

    :hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
  }

`;

export const Title = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 1.375rem;
  color: #FFFFFF;
`;

export const Body = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 1.15rem;
`;

export const Form = styled.form`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Legend = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #56BBA9;
`;

export const Input = styled.input`
  height: 2.25rem;
  border-radius: 0.25rem;
  border: solid 0.063rem #000000;
  padding: 0.5rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const Select = styled.select`
  height: 2.25rem;
  width: 25rem;
  background: transparent;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  padding: 0.5rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const Textarea = styled.textarea`
  height: 4.5rem;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  resize: none;
  padding: 1rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: 9.813rem;
  height: 2.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  background: #56BBA9;

  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #FFFFFF;

  transition: filter 0.3s;

  :hover {
    filter: brightness(0.9);
  }

`;

export const ContentMessages = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessagesContainer = styled.div`

`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const UserProfile = styled.div`

  svg {
    font-size: 2.5rem;
    color: #C4C4C4;
  }
`;

export const UserName = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1rem;
`;

export const Message = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;

`;

export const InputMessageContainer = styled.div`
  margin-top: 21.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border: 0.125rem solid #000000;
  border-radius: 0.25rem;

  svg {
    font-size: 1.5rem;
    color: #2187E5;
  }
`;

export const InputMessage = styled.input`
  padding: 0.25rem;
  width: 52rem;
  background: transparent;
  border: none;

  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;

`;
