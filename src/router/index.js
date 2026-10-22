import { createRouter, createWebHashHistory  } from 'vue-router'

const PlaceholderView = () => import('../views/PlaceholderView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const BoardView = () => import('../views/board/BoardView.vue')

const routes = [
    { path: '/', name: 'main', component: DashboardView, meta: { title: 'MAIN' } },
    { path: '/dashboard', name: 'dashboard', component: PlaceholderView, meta: { title: '현황판' } },
    { path: '/base-info', name: 'base-info', component: PlaceholderView, meta: { title: '기준정보' } },
    { path: '/order-plan', name: 'order-plan', component: PlaceholderView, meta: { title: '수주/계획관리' } },
    { path: '/purchase', name: 'purchase', component: PlaceholderView, meta: { title: '구매관리' } },
    { path: '/purchase/vendor', name: 'vendor-order', component: PlaceholderView, meta: { title: '비정규 발주' } },
    { path: '/purchase/regular', name: 'regular-order', component: PlaceholderView, meta: { title: '정규발주' } },
    { path: '/purchase/status', name: 'order-status', component: PlaceholderView, meta: { title: '발주현황' } },
    { path: '/shipping-out', name: 'shipping-out', component: PlaceholderView, meta: { title: '출발처리' } },
    { path: '/material-io', name: 'material-io', component: PlaceholderView, meta: { title: '입출고 현황' } },
    { path: '/material-release', name: 'material-release', component: PlaceholderView, meta: { title: '불출 현황' } },
    { path: '/inventory', name: 'inventory', component: PlaceholderView, meta: { title: '재고 현황' } },
    { path: '/process', name: 'process', component: PlaceholderView, meta: { title: '공정관리' } },
    { path: '/shipping', name: 'shipping', component: PlaceholderView, meta: { title: '출하관리' } },
    { path: '/quality', name: 'quality', component: PlaceholderView, meta: { title: '품질관리' } },
    { path: '/closing', name: 'closing', component: PlaceholderView, meta: { title: '마감관리' } },

    { path: '/board', name: 'board-list', component: BoardView, meta: { title: '게시판' } },
    { path: '/board/write', name: 'board-write', component: BoardView, meta: { title: '게시글 작성' } },
    { path: '/board/:id', name: 'board-detail', component: BoardView, meta: { title: '게시글 상세' } },
    { path: '/board/:id/edit', name: 'board-edit', component: BoardView, meta: { title: '게시글 수정' } },

    { path: '/b2bi', name: 'b2bi', component: PlaceholderView, meta: { title: 'B2BI Interface' } },
    { path: '/admin', name: 'admin', component: PlaceholderView, meta: { title: '관리자' } },
    { path: '/project', name: 'project', component: PlaceholderView, meta: { title: '프로젝트관리' } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router