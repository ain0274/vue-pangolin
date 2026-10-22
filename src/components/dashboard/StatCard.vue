<template>
    <div class="card">
        <div class="top">
            <h3>{{ title }}</h3>
            <button type="button" aria-label="더보기">
                <MoreVertical />
            </button>
        </div>

        <div class="bottom">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { MoreVertical } from 'lucide-vue-next';

defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.card{
    width: 520px;
    height: 420px;
    background: #fff;
    padding: 25px 30px 30px;
    border: 1px solid #E4E5E6;
    border-radius: 10px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3{
            font-size: 18px;
            font-weight: 500;
        }
    }

    .bottom{
        width: 100%;
        height: 290px;
    }
}
</style>