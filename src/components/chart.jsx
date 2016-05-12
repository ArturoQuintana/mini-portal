import React from "react";
import _ from "underscore";

import { TimeSeries } from "pondjs";

import { Charts,
         ChartContainer,
         ChartRow,
         YAxis,
         AreaChart,
         Resizable } from "react-timeseries-charts";


import Spinner from "./spinner";

export default React.createClass({
    displayName: "TrafficChart",

    getDefaultProps() {
        return {
            mock: false
        };
    },

    getInitialState() {
        return {
            tracker: null
        };
    },

    handleTrackerChanged(t) {
        this.props.trackerChanged(t);
    },

    render() {
        if (this.props.mock) {
            return (
                <img src="static/img/chart.png" alt="[chart]"
                     style={{ width: "100%", height: "200px" }} />
            );
        }

        let trafficLoaded = this.props.trafficLoaded;
        let trafficData = this.props.trafficData;
        let trafficKey = this.props.trafficKey;

        if (!trafficLoaded) {
            return (
                <Spinner />
            );
        }

        let timeSeries = trafficData[trafficKey];
        let maxValue = _.max([
            timeSeries.max("in"),
            timeSeries.max("out")
        ]);
        let timerange = timeSeries.range();
        let tracker = this.props.tracker;
/** start: chart */
        let chart = (
            <Resizable>
                <ChartContainer timeRange={timerange}
                                onTrackerChanged={this.handleTrackerChanged}
                                trackerPosition={tracker}
                                minDuration={1000 * 60 * 60}
                                maxTime={timerange.end()}
                                minTime={timerange.begin()}>

                    <ChartRow height="150">
                        <Charts>
                            <AreaChart axis="traffic"
                                       fillOpacity={0.8}
                                       series={timeSeries}
                                       columns={{up: ["in"], down: ["out"]}} />
                        </Charts>
                        <YAxis id="traffic"
                               label="Traffic (bps)"
                               min={-maxValue}
                               max={maxValue}
                               absolute={true}
                               width="60"
                               type="linear" />
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        );
/** end: chart */

        return chart;
    }
});
