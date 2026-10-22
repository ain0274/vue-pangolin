<template>
    <div class="chart-wrapper">
        <VueApexCharts
            type="line"
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
        name: 'Session Duration',
        data: [45, 50, 25, 35, 20, 16, 11, 6, 8, 15, 18]
    },
    {
        name: 'Page Views',
        data: [78, 66, 90, 60, 55, 41, 58, 45, 30, 42, 38]
    },
    {
        name: 'Total Visits',
        data: [65, 70, 55, 68, 45, 60, 50, 62, 40, 55, 48]
    }
]);

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const chartOptions = ref({
    chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false }
    },
    colors: ['#7e7fe0', '#0090e7', '#10ac84'],
    stroke: {
        curve: 'straight',
        width: [2.5, 2.5, 2.5],
        dashArray: [0, 5, 3]
    },
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
    xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
            show: true,
            width: 1,
            position: 'back',
            stroke: { color: '#cbd5e1', width: 1, dashArray: 3 }
        },
        labels: {
            style: {
                colors: ['#666666'],
                fontSize: '10px'
            }
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
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
        custom: ({ series, dataPointIndex, w }) => {
            const rows = series.map((s, i) => ({
                color: w.globals.colors[i],
                label: w.globals.seriesNames[i],
                value: `${s[dataPointIndex]}%`
            }))
            return buildTooltip(categories[dataPointIndex], rows)
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