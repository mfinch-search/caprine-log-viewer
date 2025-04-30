# Caprine Log Viewer

This repo features the code required to view logs from "[this Cribl url](https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log)". This application makes use of the fetch api to view the logs as they are fetched instead of waiting for the entire file.

This application also features unit tests to verify that its functionality works as intended.

## Getting Started

To get the application up and running make sure npm is installed then install dependencies with `npm install` 
and then boot up the application with `npm run start`

## Notes
This is made more as a proof of concept than something that should be run in production.

### What does it use?
* Apache ECharts - Creating a canvas and properly drawing bars based on grouped data was a little more time than I'm able to use


## TODO
Things that are missing that would be implemented in a more realistic setting:

* This would not likely be a standalone App, but a component used in a larger framework
* Either the url for the logs is passed in or selected at run time by the user
* More information on the log file standards would be known. This application is built under the assumption that log files when retrieved give the most recent log first then each log after is older than the previous
* A reliable way to test that allows apache echarts to render correctly. The jsdom environment doesn't play nicely with echarts and rather than sorting through all that since the chart is a bonus, testing involving the chart is currently disabled
* Testing the actions.ts. Testing the effects of the generator used by App's useEffect is certainly done, but the generator proper in actions.ts is not due to time limitations
