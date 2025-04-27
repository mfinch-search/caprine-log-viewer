import { render, screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import LogEventTable from './LogEventTable';
import type { Log } from '../lib/types';

test('should render no rows without data', async() => {
    render(<LogEventTable logEvents={[]} />)

    expect(screen.getByRole('table')).toBeDefined();
    //Only the header row should be present
    let rowsPresent = screen.getAllByRole('row')
    expect(rowsPresent.length).toEqual(1)

    expect(screen.getByText('Time')).toBeDefined()
    expect(screen.getByText('Events (0)')).toBeDefined();
    
})

test('should render rows when there is data', async () => {
    const testLogEvents: Log[] = [
        { _time: '123', funFact: 'Rabbits can see behind them without moving their heads.' },
        { _time: '456', anotherFunFact: 'Rabbits will jump and twist when they\'re happy and it\'s called a binky'}
    ]

    render(<LogEventTable logEvents={testLogEvents} />)

    expect(screen.getByRole('table')).toBeDefined();
    //We should see three rows including the header row
    let rowsPresent = screen.getAllByRole('row')
    expect(rowsPresent.length).toEqual(3)

    expect(screen.getByText('Time')).toBeDefined()
    expect(screen.getByText(`Events (${testLogEvents.length})`)).toBeDefined();

    for (const testEvent of testLogEvents) {
        expect(screen.getByText(testEvent._time)).toBeDefined()
        expect(screen.getByText(JSON.stringify(testEvent))).toBeDefined()
    }

})