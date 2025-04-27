const sampleData: Log[] = [
    { _time: '123', goatFact: 'They have 4 legs' },
    { _time: '456', goatFact2: 'They have 2 eyes' }
]

jest.mock('./lib/actions', () => ({
    getCaprineLogs: async function* (abortSignal: AbortSignal) {
        for (const event of sampleData) {
            yield Promise.resolve(event)
        }
    }
}))

jest.mock('./components/Timeline', () => () => {
    return <div>
        This is a workaround because apache echarts is very fussy about being rendered in the jsdom environment.
    </div>
})

import { render, screen, waitFor } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import App from './App';
import type { Log } from './lib/types';
import Timeline from './components/Timeline';



import { getCaprineLogs } from './lib/actions';

test('should render', async () => {

    render(<App />)

    
    await waitFor(() => expect(screen.getAllByRole('row').length).toEqual(sampleData.length + 1))

    expect(screen.getAllByRole('row').length).toEqual(sampleData.length + 1);
    for (const event of sampleData) {
        expect(screen.getByText(event._time)).toBeDefined()
        expect(screen.getByText(JSON.stringify(event))).toBeDefined()
    }


})

