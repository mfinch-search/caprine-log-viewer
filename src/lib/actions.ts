const url = 'cribl.log'
//const url = 'https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log'

//May need to use cribl.log file if cors issues crop up

export async function* getCaprineLogs(abortSignal: AbortSignal) {
    try {
        const response = await fetch(url, {
            signal: abortSignal,
            headers: {
                'Content-Type': 'application/x-ndjson',
                'Transfer-Encoding': 'chunked',
            },
        });

        if (!response.ok || !response.body) {
            throw new Error('Bad Request')
        }

        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let currentText = '';

        while (true) {
            if (!reader) {
                throw new Error('Failed to initalize reader')
            }
            const { value, done }: ReadableStreamReadResult<string> = await reader.read();

            if (done) {
                break;
            }

            currentText += value;
            const logLines = currentText.split('\n');
            currentText = logLines.pop() || '';

            for (const line of logLines) {
                if (line.trim() === '') continue;
                const logObject = JSON.parse(line);
                yield logObject
            }

        }


    } catch (error) {
        if (error instanceof Error && error.name === 'Abort Error') {
            console.log('Request was aborted');
        } else {
            throw error
        }
    }




}