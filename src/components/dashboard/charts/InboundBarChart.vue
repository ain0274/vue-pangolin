<template>
    <div class="chart-wrapper">
        <VueApexCharts
            type="rangeBar"
            width="100%"
            height="100%"
            :options="chartOptions"
            :series="series"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { buildTooltip } from '../../../utils/chartTooltip';

const series = ref([
    {
        name: 'Net Profit',
        data: [
        { x: 'Feb', y: [55, 70] },
        { x: 'Mar', y: [62, 70] },
        { x: 'Apr', y: [58, 70] },
        { x: 'May', y: [57, 70] },
        { x: 'Jun', y: [62, 70] },
        { x: 'Jul', y: [60, 70] },
        { x: 'Aug', y: [65, 70] }
        ]
    },
    {
        name: 'Revenue',
        data: [
        { x: 'Feb', y: [70, 75] },
        { x: 'Mar', y: [70, 82] },
        { x: 'Apr', y: [70, 100] },
        { x: 'May', y: [70, 97] },
        { x: 'Jun', y: [70, 85] },
        { x: 'Jul', y: [70, 105] },
        { x: 'Aug', y: [70, 91] }
        ]
    },
    {
        name: 'Free Cash Flow',
        data: [
        { x: 'Feb', y: [35, 70] },
        { x: 'Mar', y: [42, 70] },
        { x: 'Apr', y: [37, 70] },
        { x: 'May', y: [25, 70] },
        { x: 'Jun', y: [45, 70] },
        { x: 'Jul', y: [48, 70] },
        { x: 'Aug', y: [53, 70] }
        ]
    }
]);

const chartOptions = ref({
    chart: {
        type: 'rangeBar',
        toolbar: { show: false }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 0
        }
    },
    colors: ['#7e7fe0', '#0090e7', '#10ac84'],
    dataLabels: { enabled: false },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        markers: {
            width: 10,
            height: 10,
            radius: 10
        },
        itemMargin: { horizontal: 12, vertical: 8 },
        labels: { colors: '#333333' }
    },
    grid: {
        borderColor: '#f0f2f5',
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { left: 10, right: 10, bottom: 0 }
    },
    annotations: {
        yaxis: [
            {
                y: 70,
                borderColor: '#888ca8',
                strokeDashArray: 3,
                borderWidth: 1.5
            }
        ]
    },
    xaxis: {
        type: 'category',
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
            style: {
                colors: ['#666666'],
                fontSize: '10px'
            }
        }
    },
    yaxis: {
        min: 10,
        max: 130,
        tickAmount: 6,
        labels: {
            style: {
                colors: ['#666666'],
                fontSize: '10px'
            },
            formatter: (val) => Math.round(val)
        }
    },
    tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        custom: ({ dataPointIndex, w }) => {
            const rows = series.value.map((s, i) => {
                const [start, end] = s.data[dataPointIndex].y
                return {
                    color: w.globals.colors[i],
                    label: s.name,
                    value: `${start === 70 ? end : start}%`
                }
            })

            return buildTooltip(series.value[0].data[dataPointIndex].x, rows)
        }
    }
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
    width: 100%;
    height: 100%;
}
</style>