import type { Log } from '../lib/types'
import LogEventTableRow from './LogEventTable/LogEventTableRow'

export default function LogEventTable({ logEvents = [] }: {logEvents: Log[]}) {

    const logTableRows = logEvents.map((log: Log) => {
        return (
            <LogEventTableRow logEvent={log} key={log._time } />
        )
    })

    return (
        <table className='table is-striped' aria-label='Log Events'>
            <thead >
                <tr >
                    <th className="has-text-centered">Time</th>
                    <th className="has-text-left">Events ({logEvents.length })</th>
                </tr>
            </thead>
            <tbody >
                {logTableRows}
            </tbody>
        </table>
    );
}