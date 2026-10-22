<template>
    <aside class="sidebar">
        <router-link to="/" class="logo">
            <Layers :size="24" class="logo-icon" />
            <span class="logo-text">PANGOLIN</span>
        </router-link>

        <div class="search">
            <div class="search-box">
                <input type="text" placeholder="Search" />
                <Search :size="16" class="search-icon" />
            </div>
        </div>

        <nav class="menu">
            <template v-for="item in SIDEBAR_MENU" :key="item.id">
                <div
                    class="menu-item depth-1"
                    :class="{ active: selectedMenuId === item.id }"
                    @click="handleMenuClick(item)"
                >
                    <div class="item-left">
                        <component :is="item.icon" :size="18" class="nav-icon" />
                        <span>{{ item.label }}</span>
                    </div>

                    <span
                        v-if="item.hasSub"
                        class="arrow"
                        :class="{ rotated: openedMenuId === item.id }"
                    >
                        <ChevronDown :size="16" />
                    </span>
                </div>

                <div v-if="item.children && openedMenuId === item.id" class="sub-menu-group">
                    <template v-for="sub in item.children" :key="sub.id">
                        <div
                            v-if="sub.children"
                            class="menu-item depth-2 depth-2-header"
                            :class="{ open: openedSubId === sub.id }"
                            @click.stop="toggleSubMenu(sub.id)"
                        >
                            <span>{{ sub.label }}</span>
                            <span
                                class="arrow"
                                :class="{ rotated: openedSubId === sub.id }"
                            >
                                <ChevronDown :size="16" />
                            </span>
                        </div>

                        <div v-if="sub.children && openedSubId === sub.id" class="sub-depth-3">
                            <router-link
                                v-for="leaf in sub.children"
                                :key="leaf.id"
                                :to="leaf.path"
                                class="depth-3-item"
                                :class="{ active: selectedMenuId === leaf.id }"
                                @click="selectedMenuId = leaf.id"
                            >
                                <ChevronRight :size="14" class="bullet-arrow" />
                                <span>{{ leaf.label }}</span>
                            </router-link>
                        </div>

                        <router-link
                            v-else-if="sub.type === 'plus'"
                            :to="sub.path"
                            class="depth-2-plus"
                            :class="{ active: selectedMenuId === sub.id }"
                            @click.stop="selectedMenuId = sub.id"
                        >
                            <span>{{ sub.label }}</span>
                            <Plus :size="16" class="plus-icon" />
                        </router-link>
                    </template>
                </div>
            </template>
        </nav>

        <div class="button">
            <button>
                관리자
                <ChevronRight :size="12" />
            </button>
            <button>
                다국어 관리
                <ChevronRight :size="12" />
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SIDEBAR_MENU } from '@/constants/menuData'
import {
    Layers,
    Search,
    ChevronDown,
    ChevronRight,
    Plus
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const openedMenuId = ref(null)
const openedSubId = ref(null)
const selectedMenuId = ref('main')

const handleMenuClick = (item) => {
    selectedMenuId.value = item.id

    if (item.hasSub) {
        openedMenuId.value = openedMenuId.value === item.id ? null : item.id
    }

    if (item.path) {
        router.push(item.path)
    }
}

const toggleSubMenu = (id) => {
    openedSubId.value = openedSubId.value === id ? null : id
}

watch(
    () => route.path,
    (currentPath) => {
        const mainTarget = SIDEBAR_MENU.find((item) => {
            if (!item.path) return false
            if (item.path === '/') return currentPath === '/'
            return currentPath === item.path || currentPath.startsWith(item.path + '/')
        })

        if (mainTarget) {
            selectedMenuId.value = mainTarget.id
            return
        }

        SIDEBAR_MENU.forEach((parent) => {
            if (!parent.children) return

            parent.children.forEach((sub) => {
                const isSubMatch = sub.path && (currentPath === sub.path || currentPath.startsWith(sub.path + '/'))
                if (isSubMatch) {
                    selectedMenuId.value = sub.id
                    openedMenuId.value = parent.id
                }

                if (sub.children) {
                    sub.children.forEach((leaf) => {
                        const isLeafMatch = leaf.path && (currentPath === leaf.path || currentPath.startsWith(leaf.path + '/'))
                        if (isLeafMatch) {
                            selectedMenuId.value = leaf.id
                            openedMenuId.value = parent.id
                            openedSubId.value = sub.id
                        }
                    })
                }
            })
        })
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
$bg-sidebar: #4859a6;
$bg-header: #3d4d92;
$bg-search: rgba(0, 0, 0, 0.2);
$bg-active: #2aac8e;
$bg-sub-active: #5c70b5;
$bg-hover: rgba(255, 255, 255, 0.08);

$text-main: #ffffff;
$text-muted: #9fb0df;
$text-sub: #b8c4ea;

.sidebar {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100vh;
    background-color: $bg-sidebar;
    color: $text-muted;
    box-sizing: border-box;

    .logo {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background-color: $bg-header;
        color: $text-main;

        .logo-icon {
            flex-shrink: 0;
        }

        .logo-text {
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
    }

    .search {
        padding: 20px 15px 0;

        .search-box {
            position: relative;
            display: flex;
            align-items: center;

            input {
                width: 100%;
                height: 36px;
                padding: 0 34px 0 12px;
                background-color: $bg-search;
                border-radius: 6px;
                border: none;
                outline: none;
                color: $text-main;
                font-size: 0.875rem;
                box-sizing: border-box;

                &::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                &:focus {
                    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
                }
            }

            .search-icon {
                position: absolute;
                right: 10px;
                color: rgba(255, 255, 255, 0.5);
                pointer-events: none;
            }
        }
    }

    .menu {
        flex: 1;
        overflow-y: auto;
        padding: 20px 15px;
        
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: transparent;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }    

        .menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            padding: 0 12px;
            border-radius: 6px;
            cursor: pointer;
            user-select: none;
            font-size: 0.9rem;
            text-decoration: none;
            color: inherit;
            transition: background-color 0.15s ease, color 0.15s ease;

            .item-left {
                display: flex;
                align-items: center;
                gap: 12px;

                .nav-icon {
                flex-shrink: 0;
                }
            }

            .arrow {
                display: flex;
                align-items: center;
                transition: transform 0.2s ease;

                &.rotated {
                transform: rotate(180deg);
                }
            }

            &:hover {
                background-color: $bg-hover;
                color: $text-main;
            }

            &.active {
                background-color: $bg-active;
                color: $text-main;
                font-weight: 500;
            }
        }

        .sub-menu-group {
            margin-top: 4px;

            .depth-2-header {
                background-color: $bg-sub-active;
                color: $text-main;
                font-weight: 500;
                border-radius: 4px;
                margin-bottom: 4px;
            }

            .sub-depth-3 {
                display: flex;
                flex-direction: column;
                padding: 4px 0 8px;

                .depth-3-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    height: 32px;
                    padding-left: 28px;
                    color: $text-sub;
                    font-size: 0.85rem;
                    text-decoration: none;
                    border-radius: 4px;

                    .bullet-arrow {
                        opacity: 0.7;
                    }

                    &:hover {
                        color: $text-main;
                        background-color: $bg-hover;
                    }

                    &.active {
                        color: $text-main;
                        font-weight: 600;
                    }
                }
            }

            .depth-2-plus {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 36px;
                padding: 0 12px 0 28px;
                color: $text-sub;
                font-size: 0.875rem;
                cursor: pointer;
                border-radius: 4px;
                text-decoration: none;

                &:hover {
                    color: $text-main;
                    background-color: $bg-hover;
                }

                &.active {
                    color: $text-main;
                    font-weight: 600;
                }

                .plus-icon {
                    opacity: 0.8;
                }
            }
        }
    }

    .button{
        width: 100%;
        display: flex;
        background: #2b333e;
        
        button{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            flex: 1;
            padding: 6px 10px;
            font-size: 12px;
            color: #ffffff;
            border-right: 1px solid #000000;
        }
    }
}
</style>