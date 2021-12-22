import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #FFF;
    --black: #000;

    --gray-50: #F7F8FA;
    --gray-100: #E6E8EB;
    --gray-150: #dbdbdb;
    --gray-200: #AFB2B1;
    --gray-500: #808080;
    --gray-600: #555555;
    --gray-800: #494D4B;
    --gray-900: rgba(0,0,0,0.9);

    --whats-green: #56d45f;
    --success: #00d619;
    --danger: #c53030;
    --danger-darker: #6e1a1a;
    --warning: #f29d00;
    --info: #00b4e0;

    --yellow: #FED44A;
    --yellow-100: #FEC310;
    --yellow-120: #F9BE00;
    --yellow-150: #F7AC37;

    --red-tomato: #c53030;
    --red-danger: #f32013;

    --aqua--10: #319cad;
    --aqua: #00AECA;
    --aqua-100: #08E8F8;
    --aqua-150: #2ae1ff;

    --fb-blue: #4267B2;

    --wine: #44063e;

    --pink: #FF4DF8;

    --purple-50: #f2baff;
    --purple-100: #d29bde;
    --purple-110: #AF76BF;
    --purple-120: #A963B9;
    --purple-150: #d94ff7;
    --purple: #812E93;

    --dark-purple: #61137A;
    --dark-100-purple: #3d0f49;
    --dark-120-purple: #3C1145;
    --dark-125-purple: #390C44;

    /* OPACITY */
    --dark-100-purple-opacity-60: rgba(61, 15, 73,0.6);
  }


  @media (max-width: 1080px){
    html{
      font-size: 93.75%; //15px
    }
  }

  @media (max-width: 720px){
    html{
      font-size: 87.5%; //14px
    }
  }



  body{
    background: url("/assets/images/background.png");
    background-repeat: repeat-x;
    background-size: auto;
  }

  body, textarea, button{
   font: 600 1rem Roboto sans-serif;
   color: var(--white);
   overflow-x: hidden;

  }
  input {
    font: 400 1rem Roboto sans-serif;
    font-weight: normal;
  }

  h1, h2, h3, h4, h5, h6{
    font-weight: 600;
    font-family: Roboto, sans-serif;
    color: var(--gray-50);
  }

  h1{
    font-size: 2rem;
  }

  h2{
    font-size: 1.5rem;
  }

  button{
    cursor: pointer;
  }

  .hasVerticalScroll{
    overflow-x: hidden !important;

    &::-webkit-scrollbar {
      display: unset;
    }
    &::-webkit-scrollbar {
      width: 0.25rem !important;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--pink);
      border-radius: 0.5rem;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--gray-600);
    }
  }
`;
