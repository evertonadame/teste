import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-self: flex-end;
  align-items: center;
  background-color: black;
  border-radius: 0px 0px 12px 12px;

  .form {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .input {
    width: 100%;
  }

  .imageUploader {
    display: flex;
  }
`;
