<template>
    <header>
        <div class="top">
            <button
                type="button"
                aria-label="사이드바 메뉴 토글"
                @click="$emit('toggle-sidebar')"
            >
                <Menu :size="22" color="#6C757D" />
            </button>
            <div class="right">
                <div class="member">
                    <User :size="24" color="#8E9AA9" />
                    <p>김아인(개발)(FAKR/FINEALTECH)</p>
                    <p class="state">[관리자]</p>
                </div>
                <div class="account">
                    <select>
                        <option>관리자</option>
                        <option>사용자</option>
                    </select>
                    <ChevronDown class="dropdown-icon" :size="18" stroke-width="3" color="#8E9AA9" />
                </div>
                <button type="button" class="logout" aria-label="로그아웃">
                    <LogOut :size="24" color="#8E9AA9" />
                </button>
            </div>
        </div>
        <div class="bottom">
            <div v-if="currentMenu" class="page-badge">
                <component :is="currentMenu.icon" :size="16" :stroke-width="2.5" class="badge-icon" />
                <span>{{ currentMenu.label }}</span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, User, ChevronDown, LogOut, Layers } from 'lucide-vue-next';
import { SIDEBAR_MENU } from '../../constants/menuData';

defineEmits(['toggle-sidebar']);

const route = useRoute();

const isMatch = (menuPath, currentPath) =>
    menuPath === '/'
        ? currentPath === '/'
        : currentPath === menuPath || currentPath.startsWith(menuPath + '/');

const currentMenu = computed(() => {
    const path = route.path;

    for (const parent of SIDEBAR_MENU) {
        for (const sub of parent.children ?? []) {
            if (sub.path === path) return sub;
            const leaf = sub.children?.find((item) => item.path === path);
            if (leaf) return leaf;
        }
    }

    const top = SIDEBAR_MENU.find((item) => item.path && isMatch(item.path, path));
    if (top) return top;

    return { label: 'MAIN', icon: Layers };
});
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-bottom: 1px solid #bfbfbf;

    .top{
        width: 100%;
        height: 60px;
        padding: 0 0 0 20px;
        border-bottom: 1px solid #e5e5e5;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .right{
            height: 100%;
            display: flex;
            align-items: center;
            
            .member{
                height: 100%;
                display: flex;
                align-items: center;
                border-right: 1px solid #e5e5e5;
                padding-right: 20px;

                p{
                    font-size: 12px;
                    font-weight: 600;

                }

                .state{
                    color: #2e74d3;
                }
            }

            .account{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                padding: 0 20px;
                border-right: 1px solid #e5e5e5;

                select{
                    font-size: 12px;
                    padding-right: 20px;

                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    
                    font-size: 12px;
                    background-color: transparent;
                    border: none;
                    outline-style: none;
                    cursor: pointer;

                    option{
                        font-size: 12px;
                        text-align: center;
                    }
                }

                .dropdown-icon {
                    position: absolute;
                    right: 20px;
                    pointer-events: none;
                }
            }

            .logout{
                height: 100%;
                padding: 17px 20px;
                cursor: pointer;
            }
        }
    }

    .bottom{
        width: 100%;
        height: 60px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .page-badge{
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 10px 25px;
            background-color: #2aac8e; 
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            border-radius: 20px;

            .badge-icon {
                flex-shrink: 0;
            }
        }
    }
}
</style>