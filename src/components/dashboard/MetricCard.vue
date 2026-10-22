<template>
    <div class="card">
        <div class="top">
            <h3>{{ item.title }}</h3>
            <div class="icon">
                <component :is="item.icon" :size="25" :stroke-width="2.5" :color="item.color" />
            </div>
        </div>

        <div class="middle">
            <p>{{ item.rate }}</p>
            <div class="progress-track">
                <div
                    class="progress-bar"
                    :style="{ width: `${item.rate}%`, background: item.color }"
                ></div>
            </div>
        </div>

        <div class="bottom">
            <p>{{ item.target }}</p>
            <p>{{ item.actual }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.card{
    width: 300px;
    height: 190px;
    background: #ffffff;
    padding: 20px 18px;
    border: 1px solid #e4e5e6;
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

        .icon{
            width: 42px;
            height: 42px;
            background: #eceff2;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .middle{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 7px;

        p{
            font-size: 20px;
            font-weight: 700;
        }

        .progress-track{
            width: 100%;
            height: 5px;
            border-radius: 5px;
            background: #f5f6f8;

            .progress-bar{
                height: 100%;
                border-radius: 5px;
                transition: width .4s ease;
            }
        }
    }

    .bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;

        p{
            width: 50%;
            height: 30px;
            font-size: 17px;
            font-weight: 500;
            text-align: center;
            color: #888ca8;

            &:first-child{
                border-right: 1px solid #e6e6e6;
            }
        }
    }
}
</style>