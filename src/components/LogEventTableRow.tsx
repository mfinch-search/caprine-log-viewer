import type { Log } from "../lib/types";
import { useState } from "react";

const UNICODE_RIGHT_ARROW = '\u{1F782}'
const UNICODE_DOWN_ARROW = '\u{1F783}'

export default function LogEventTableRow({ logEvent }: { logEvent: Log }) {
    const [isExpanded, setExpanded] = useState<boolean>(false)

    function toggleExpansion() {
        setExpanded(!isExpanded)
    }

    function isoFormat(time: string) {
        return new Date(+time).toISOString();
    }

    return (
        <tr>
            <td className="is-flex-apart is-size-6 " >
                <button aria-expanded={isExpanded ? 'true' : 'false'} onClick={() => toggleExpansion()} className="button is-text mr-1">
                    <span className=''>{isExpanded ? UNICODE_DOWN_ARROW : UNICODE_RIGHT_ARROW}</span>
                </button>
                <span>{isoFormat(logEvent._time)} </span>
            </td>
            {isExpanded ?
                <td className="has-text-left is-family-code is-size-6"><pre>{JSON.stringify(logEvent, null, ' ')}</pre></td> :
                <td className="has-text-left is-family-code is-size-6 no-wrap">{JSON.stringify(logEvent)}</td>
            }
        </tr>
    )
}