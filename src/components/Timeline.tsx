import ReactECharts from 'echarts-for-react'
import type { Log } from '../lib/types'

export default function Timeline({ logEvents = [] }: { logEvents: Log[] }) {
    function timeStampAsDate(timestamp: number): Date {
        return new Date(timestamp)
    }

    function createDateTimeGroupings(eventEntries: Log[]) {
        let timeMap = new Map();
        eventEntries.forEach(timestamp => {
            let date = timeStampAsDate(+timestamp._time)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0)

            const formattedDate = new Intl.DateTimeFormat('en-us', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
            }).format(date)

            if (timeMap.has(formattedDate)) {
                timeMap.set(formattedDate, timeMap.get(formattedDate) + 1)
            } else {
                timeMap.set(formattedDate, 1)
            }
        })

        return timeMap

    }

    function getOptions() {
        let timeMap = createDateTimeGroupings(logEvents)

        let xAxisData: string[] = []
        let seriesData: number[] = []

        timeMap.forEach((value: number, key: string, map: any) => {
            xAxisData.push(key)
            seriesData.push(value)
        });





        return {
            xAxis: {
                type: 'category',
                name: 'Grouped Log Events By Hour',
                nameLocation: 'middle',
                nameGap: '30',
                data: xAxisData.reverse(),
            },
            yAxis: {
                type: 'value',
                nameLocation: 'middle',
                nameGap: '30',
                name: 'Log Event Count'
            },
            animation: false,
            series: [
                {
                    name: 'Log Events',
                    type: 'bar',
                    data: seriesData.reverse(),
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
        }
    }

    return (
        <ReactECharts
            option={getOptions()}
            notMerge={false}
            lazyUpdate={true}
            style={{ height: '300px' }}

        />
    );
}