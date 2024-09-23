import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryApp } from './components/ReactQueryApp';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

function App() {
  return (
    <div className="flex gap-2">
      <QueryClientProvider client={queryClient}>
        <ReactQueryApp />
      </QueryClientProvider>
    </div>
  );
}

export default App;
