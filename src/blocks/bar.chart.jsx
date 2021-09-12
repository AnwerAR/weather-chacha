import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PT from 'prop-types';
import { getDateFromTS, parseTemprature } from '../helpers';

/**
 * Draw bar chart.
 *
 * @param {node} svg - svg element.
 * @param {object[]} data - array of key value pair.
 */
const drawChart = ((svg, data, innerHeight, width, margin, baseUnit) => {
    const graph = svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`);

    const gXAxis = graph.append('g')
        .attr('transform', `translate(2, ${innerHeight})`);
    const gYAxis = graph.append('g');
    // Y axis.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([innerHeight, 0]);

    // Labels of on X-axis
    const x = d3.scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    const rects = graph.selectAll('rect').data(data);

    rects.attr('width', x.bandwidth() > 100 ? 100 : x.bandwidth)
        .attr('height', (d) => innerHeight - y(d.value))
        .attr('x', (d) => x(d.label))
        .attr('y', (d) => y(d.value));

    const bar = rects.enter().append('g');

    bar.append('rect')
        .attr('class', 'tw-border tw-text-green-100 tw-fill-current')
        .attr('width', x.bandwidth() > 100 ? 100 : x.bandwidth)
        .attr('height', (d) => innerHeight - y(d.value))
        .attr('x', (d) => x(d.label))
        .attr('y', (d) => y(d.value));

    bar.append('text')
        .attr('width', x.bandwidth() > 100 ? 100 : x.bandwidth)
        .attr('transform', `translate(${(x.bandwidth() > 100 ? 100 : x.bandwidth()) / 2}, 20)`)
        .attr('class', 'tw-text-green-700')
        .attr('x', (d) => x(d.label))
        .attr('y', (d) => y(d.value))
        .text((d) => parseTemprature(d.value, baseUnit))
        .attr('text-anchor', 'middle');

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(data.length)
        .tickFormat((d) => parseTemprature(d, baseUnit));

    gXAxis.call(xAxis);
    gYAxis.call(yAxis);
    gXAxis.selectAll('text')
        .style('font-size', 14);

    gYAxis.selectAll('text')
        .style('font-size', 14);
});

export default function BarChart({ timestamp, graphData, baseUnit }) {
    const ref = useRef();

    const height = Math.max(...graphData.map(({ value }) => value)) * 12;
    const width = height * 2;
    const margin = {
        left: 50, top: 10, right: 50, bottom: 0,
    };

    const graphHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current)
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('class', 'tw-text-green-100 tw-fill-current')
                .attr(
                    'viewBox',
                    `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
                );

            // Clear all.
            svg.selectAll('*').remove();

            // Draw barchart.
            drawChart(svg, [...graphData], graphHeight, width, margin, baseUnit);
        }
    }, [baseUnit, graphData]);
    return (
        <div data-cy="bar-chart" className="tw-my-8 tw-p-4 tw-shadow-md tw-bg-green-700 tw-border tw-pb-8">
            <h3 className="tw-text-center tw-mb-4 tw-mt-2 tw-bold tw-text-green-100 tw-font-bold tw-text-lg">
                {`Complete forecast history of: ${getDateFromTS(timestamp, true)}`}
            </h3>
            <svg ref={ref} />
        </div>
    );
}

BarChart.propTypes = {
    timestamp: PT.number.isRequired,
    graphData: PT.arrayOf(PT.shape({
        label: PT.string,
        value: PT.number,
    })).isRequired,
    baseUnit: PT.string.isRequired,
};
