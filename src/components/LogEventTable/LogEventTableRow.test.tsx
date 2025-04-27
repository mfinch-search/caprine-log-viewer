import LogEventTableRow from './LogEventTableRow';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import type { Log } from '../../lib/types';



test('Should render a table row', async () => {
    const sampleLog: Log = {
        _time: '123456789',
        otherParam: 'Hello World!',
        goatEntity: 'Is watching, judging'
    }

    render(<table><tbody><LogEventTableRow logEvent={sampleLog} /></tbody></table>)

    expect(screen.getByRole('row')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText(sampleLog._time)).toBeDefined();
    expect(screen.getByText(JSON.stringify(sampleLog))).toBeDefined()
});

test('Should expand and collapse a table row', async () => {
    const sampleLog: Log = {
        _time: '123456789',
        otherParam: 'Hello World!',
        goatEntity: 'Is watching, judging'
    }


    render(<table><tbody><LogEventTableRow logEvent={sampleLog} /></tbody></table>)

    let button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')

});