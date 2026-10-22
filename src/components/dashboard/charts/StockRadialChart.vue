<template>
  <div class="radial-wrap">
    <VueApexCharts
      type="radialBar"
      height="340"
      width="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([15, 30, 42, 48]);

const chartOptions = ref({
    chart: {
        type: 'radialBar',
        sparkline: { enabled: true }
    },
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        },
        active: {
            filter: {
                type: 'none'
            }
        }
    },
    tooltip: {
        enabled: false
    },
    colors: ['#7D88F0', '#0097E6', '#20BF6B', '#6C5CE7'],
    plotOptions: {
        radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
                size: '38%'
            },
            track: {
                background: '#EDF1F5',
                strokeWidth: '70%',
                margin: 6
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#8E9AA9',
                    offsetY: -8 
                },
                value: {
                    show: true,
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#111111',
                    offsetY: 10, 
                    formatter: () => '249'
                },
                total: {
                    show: true,
                    label: 'Total',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#8E9AA9',
                    formatter: () => '249'
                }
            }
        }
    },
    stroke: {
        lineCap: 'round'
    }
});
</script>

<style scoped>
.radial-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    pointer-events: none;
}
</style>