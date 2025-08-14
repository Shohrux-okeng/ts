import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const client = new QueryClient()
const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  )
} else {
  console.error('Root element not found')
}