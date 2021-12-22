import React, { useState } from 'react';
import RightNav from './RightNav';
import { StyledBurger } from './BurguerStyles';


const Burger = () => {
  
  const [open, setOpen] = useState(false)
  
    return (
      <>
        <div>
               
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
        </div>
        <RightNav open={open}/>
      </>
    )
  }
  
  export default Burger;