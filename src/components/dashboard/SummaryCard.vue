<template>
    <div class="card">
        <h3>{{ title }}</h3>
        <div class="chart-container">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: { type: String, default: '매입/매출현황(주간)' }
})
</script>

<style lang="scss" scoped>
.card{
    width: 100%;
    height: 460px;
    background: #fff;
    padding: 25px 30px 30px;
    border: 1px solid #E4E5E6;
    border-radius: 10px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        font-size: 18px;
        font-weight: 500;
    }

    .chart-container{
        width: 100%;
        height: 320px;
    }
}
</style>