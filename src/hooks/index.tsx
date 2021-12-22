import { AuthProvider } from './auth';
import { DoubtProvider } from './doubts';
import { WsProvider } from './ws';
import { ChatProvider } from './chat';
import { CountdownProvider } from './countdown';

type AppProviderProps = {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps): JSX.Element => (
  <AuthProvider>
    <WsProvider>
      <ChatProvider>
        <DoubtProvider>
          <CountdownProvider>
            {children}
          </CountdownProvider>
        </DoubtProvider>
      </ChatProvider>
    </WsProvider>
  </AuthProvider>
);

export default AppProvider;
