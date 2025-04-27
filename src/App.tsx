import "./styles.css";
import { useEffect, useState } from 'react'
import { getCaprineLogs } from './lib/actions';
import LogEventTable from './components/LogEventTable';
import Timeline from './components/Timeline';


import type { Log } from './lib/types';


export default function App() {
    const [logs, setLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController()

        async function getLines() {
            try {
                for await (const log of getCaprineLogs(abortController.signal)) {
                    setLogs(prevState => [...prevState, log])
                    setLoading(false)
                    await new Promise(resolve => requestAnimationFrame(resolve))
                }
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log(`Request was aborted`);
                } else {
                    console.error('Something else went wrong', error)
                    setLoading(false);
                }
            }
        }
        getLines()

        return () => {
            abortController.abort();
        }

    }, [])

    if (loading) {
        return (
            <div className="App">
                <h1 className="title">Caprine Log Viewer</h1>
                <h2 className="subTitle">Currently Loading...</h2>
            </div>

        )
            
    }
    if (!logs.length) {
        return (
            <div className="App">
                <h1 className="title">Caprine Log Viewer</h1>
                <h2 className="subTitle">Failed to load logs</h2>
            </div>
        )
    }


    return (
        <div className="App">
            <h1 className="title">Caprine Log Viewer</h1>
            
            <Timeline logEvents={logs} />

            <LogEventTable logEvents={logs} />
        </div>
    );
}
