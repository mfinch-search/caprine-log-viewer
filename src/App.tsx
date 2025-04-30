import "./styles.css";
import { useEffect, useState } from 'react'
import { getCaprineLogs } from './lib/actions';
import LogEventTableRow from './components/LogEventTableRow';


import type { Log } from './lib/types';
import Timeline from "./components/Timeline";


export default function App() {
    const [logs, setLogs] = useState<Log[]>([])

    async function forceRender() {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }

    const logTableRows = logs.map((log: Log, index: number) => {
        return (
            <LogEventTableRow logEvent={log} key={`${log._time} - ${index}`} />
        )
    })

    useEffect(() => {
        const abortController = new AbortController()

        async function getLines() {
            try {
                const batchSize = 5000;
                const firstBatchSize = 100;
                let procesedLogs: Log[] = [];

                let caprineLogs = await getCaprineLogs(abortController.signal)

                let firstEntry = await caprineLogs.next();

                if (!firstEntry.done) {
                    setLogs([firstEntry.value])
                    await forceRender();
                    
                }

                for (let i = 0; i < firstBatchSize; i++) {
                    const logEvent = await caprineLogs.next()
                    if (!logEvent.done) {
                        setLogs(prevValue => [...prevValue, logEvent.value])
                        await forceRender();
                    }
                    
                }
                

                

                for await (const log of caprineLogs) {
                    procesedLogs.push(log)
                    if (procesedLogs.length >= batchSize) {
                        setLogs(prevState => [...prevState, ...procesedLogs])
                        await forceRender();
                        procesedLogs = []
                    }

                    
                    
                    
                }

                if (procesedLogs.length) {
                    setLogs(prevState => [...prevState, ...procesedLogs])
                }
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log(`Request was aborted`);
                } else {
                    console.error('Something else went wrong', error)
                }
            }
        }
        getLines()

        return () => {
            abortController.abort();
        }

    }, [])


    return (
        <div className="App">
            <h1 className="title">Caprine Log Viewer</h1>

            <Timeline logEvents={logs }/>

            <table className='table is-striped' aria-label='Log Events'>
                <thead >
                    <tr >
                        <th className="has-text-centered">Time</th>
                        <th className="has-text-left">Events ({logs.length})</th>
                    </tr>
                </thead>
                <tbody >
                    {logTableRows}
                </tbody>
            </table>
        </div>
    );
}