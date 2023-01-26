import Head from 'next/head'
import dynamic from 'next/dynamic'

const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

export default function Message() {
  return (
    <div className="container">

      <main>
        <h1 className="title">Next.js Chat Demo</h1>
        <AblyChatComponent />
      </main>

    </div>
  )
}