/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState, useEffect } from 'react';
import Burguer from './Burguer';
import { 
  ImgContainer1,
  HeaderCont
} 
from './styles';
import { useRouter } from 'next/router';
import { Separator } from 'components/Atoms/Separator';
import { useAuth } from 'hooks/auth';


interface HeaderProps {
  actualTab?: string;
  tabs: Array<{ key: string; value: string }>;
  session?: boolean;
  children?: ReactNode;
  changeTab?(tab: string): void;

}

export const Header = ({
  changeTab,
  actualTab,
  tabs,
  session = false,
  children,
}: HeaderProps): JSX.Element => {

const { user } = useAuth();
const { push, pathname } = useRouter();
const [screenSize, setScreenSize] = useState(true);



if ((!user.name && !session) || pathname === '/') return <></>;



 
  return (
    
    <HeaderCont>
       <ImgContainer1
            onClick={() => push('/')}
            src="/assets/images/nextLevel.png"
            alt="nllogo"
          />
        
        <Burguer/>
        <Separator type="horizontal" className="saparator-header"/>
    </HeaderCont>

  );
};
