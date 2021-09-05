import React, { useEffect, useRef } from 'react';
import * as D3 from 'd3';
import PT from 'prop-types';
import { parseTemprature } from '../helpers';

export default function BarChart({ graphData, baseUnit }) {
    const ref = useRef();

    const width = '100%';
    const height = 600;
    const margin = {
        top: 20, right: 20, bottom: 100, left: 100,
    };

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const drawChart = ((data, graph, gXAxis, gYAxis) => {
        // Y axis.
        const y = D3.scaleLinear()
            .domain([0, D3.max(data, (d) => d.value)])
            .range([graphHeight, 0]);

        // Labels of on X-axis
        const x = D3.scaleBand()
            .domain(data.map(({ label }) => label))
            .range([0, data.length * 80])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        const rects = graph.selectAll('rect').data(data);

        rects.attr('width', x.bandwidth)
            .attr('class', 'bar-rect')
            .attr('height', (d) => graphHeight - y(d.value))
            .attr('x', (d) => x(d.label))
            .attr('y', (d) => y(d.value));

        rects.enter()
            .append('rect')
            .attr('class', 'tw-bg-green-500')
            .attr('fill', '#ffffff')
            .attr('width', x.bandwidth)
            .attr('height', (d) => graphHeight - y(d.value))
            .attr('x', (d) => x(d.label))
            .attr('y', (d) => y(d.value));

        const xAxis = D3.axisBottom(x);
        const yAxis = D3.axisLeft(y)
            .ticks(data.length)
            .tickFormat((d) => parseTemprature(d, baseUnit));

        gXAxis.call(xAxis);
        gYAxis.call(yAxis);
        gXAxis.selectAll('text')
            .style('font-size', 14);

        gYAxis.selectAll('text')
            .style('font-size', 14);
    });

    useEffect(() => {
        if (ref.current) {
            const svg = D3.select(ref.current)
                .attr('width', width)
                .attr('class', 'tw-bg-green-700 tw-text-white tw-pt-8')
                .attr('height', height);

            svg.selectAll('*').remove();
            const graph = svg.append('g')
                .attr('width', graphWidth)
                .attr('height', graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const gXAxis = graph.append('g')
                .attr('transform', `translate(0, ${graphHeight})`);
            const gYAxis = graph.append('g');

            drawChart(graphData, graph, gXAxis, gYAxis);
        }
    }, [ref, graphData, baseUnit]);

    return (
        <svg ref={ref} />
    );
}

BarChart.propTypes = {
    graphData: PT.arrayOf(PT.shape({
        label: PT.string,
        value: PT.number,
    })).isRequired,
    baseUnit: PT.string.isRequired,
};
