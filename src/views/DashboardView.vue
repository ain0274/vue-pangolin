<template>
    <main class="dashboard">
        <section class="row-metrics">
            <MetricCard
                v-for="card in METRIC_CARDS"
                :key="card.id"
                :item="card"
            />
        </section>

        <section class="row-stats">
            <StatCard title="고객사 계획 변동현황">
                <CustomerLineChart />
            </StatCard>
            <StatCard title="재고 현황">
                <StockRadialChart />
            </StatCard>
            <StatCard title="출발처리 대비 입고 현황">
                <InboundBarChart />
            </StatCard>
        </section>

        <section class="row-summary">
            <SummaryCard title="매입/매출현황(주간)">
                <WeeklyAreaChart />
            </SummaryCard>
        </section>
    </main>
</template>

<script setup>
import MetricCard from '@components/dashboard/MetricCard.vue';
import StatCard from '@components/dashboard/StatCard.vue';
import SummaryCard from '@components/dashboard/SummaryCard.vue';
import { METRIC_CARDS } from '../constants/dashboardData';

import CustomerLineChart from '@/components/dashboard/charts/CustomerLineChart.vue';
import StockRadialChart from '@/components/dashboard/charts/StockRadialChart.vue';
import InboundBarChart from '@/components/dashboard/charts/InboundBarChart.vue';
import WeeklyAreaChart from '@/components/dashboard/charts/WeeklyAreaChart.vue';
</script>

<style lang="scss" scoped>
.dashboard{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 35px;

    .row-metrics{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
    }

    .row-stats {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
    }

    .row-summary {
        width: 100%;
    }
}
</style>