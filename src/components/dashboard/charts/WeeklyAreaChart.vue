<template>
  <div class="chart-wrapper">
    <VueApexCharts
      type="area"
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
    name: 'Expected',
    data: [0.5, 1.2, 2.0, 2.5, 5.6, 3.2, 2.0, 3.2, 4.5, 3.8, 2.5, 3.7, 4.8, 3.3, 2.2, 3.1, 4.0]
  },
  {
    name: 'Real',
    data: [0.4, 1.0, 1.8, 2.2, 5.0, 2.8, 1.7, 2.8, 3.9, 3.2, 2.1, 3.3, 4.2, 2.9, 1.9, 2.6, 3.5]
  }
]);

const categories = [
  '11 Nov', '12 Nov', '13 Nov', '14 Nov', '15 Nov',
  '16 Nov', '17 Nov', '18 Nov', '19 Nov', '20 Nov',
  '21 Nov', '22 Nov', '23 Nov', '24 Nov', '25 Nov',
  '26 Nov', '27 Nov'
];

const chartOptions = ref({
    chart: {
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false }
    },
    colors: ['#4fd1c5', '#7e7fe0'],
    stroke: {
        curve: 'smooth',
        width: 0
    },
    fill: {
        type: 'solid',
        opacity: [1, 1]
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        markers: {
            width: 12,
            height: 12,
            radius: 12
        },
        itemMargin: {
            horizontal: 16,
            vertical: 10
        },
        fontSize: '14px',
        labels: {
            colors: '#333333'
        }
    },
    grid: {
        borderColor: '#f0f2f5',
        xaxis: {
            lines: { show: false } 
        },
        yaxis: {
            lines: { show: true } 
        },
        padding: {
            left: 10,
            right: 10,
            bottom: 0
        }
    },
    xaxis: {
        type: 'category',
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
            style: {
                colors: ['#666666'],
                fontSize: '10px'
            },
            formatter: (val) => {
                const day = parseInt(val);
                return day % 2 !== 0 ? val : '';
            }
        }
    },
    yaxis: {
        min: 0,
        max: 6,
        tickAmount: 6,
        labels: {
            style: {
                colors: ['#666666'],
                fontSize: '10px'
            },
            formatter: (val) => {
                return Math.round(val);
            }
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