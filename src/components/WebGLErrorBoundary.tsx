import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  reason: string
}

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, reason: '' }

  static getDerivedStateFromError(error: Error): State {
    const msg = error?.message ?? ''
    const isWebGL = msg.includes('WebGL') || msg.includes('webgl') || msg.includes('context')
    return { hasError: isWebGL, reason: isWebGL ? msg : '' }
  }

  componentDidCatch(_error: Error) {
    if (this.props.fallback) return
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#080d1f] text-center px-6">
          <div className="text-7xl mb-6">🌌</div>
          <h1 className="text-2xl font-bold text-[#ffd84d] mb-3">
            Ứng dụng cần WebGL
          </h1>
          <p className="text-base text-[#8899bb] max-w-md leading-relaxed mb-6">
            Trình duyệt của bạn không hỗ trợ đồ họa 3D. Vui lòng thử trên Chrome,
            Edge, hoặc Safari để khám phá vũ trụ cùng Min Cute nhé!
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-4xl opacity-40">
            <span>🌍</span>
            <span>🪐</span>
            <span>⭐</span>
            <span>🚀</span>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}