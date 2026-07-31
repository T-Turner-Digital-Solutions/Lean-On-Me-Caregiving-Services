import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

// Catches render errors anywhere in the tree and shows a polished fallback
// instead of a blank white screen.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Unexpected UI error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <h1 className="font-serif text-3xl text-navy">Something went wrong</h1>
          <p className="max-w-md text-navy/60">
            We hit an unexpected error. Please refresh the page, or call us at{' '}
            <a className="font-semibold text-teal" href="tel:2056874047">
              205-687-4047
            </a>
            .
          </p>
          <button className="btn-teal" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
