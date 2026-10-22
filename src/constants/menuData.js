import {
    Home,
    LayoutDashboard,
    CreditCard,
    ClipboardList,
    ShoppingCart,
    Settings,
    Truck,
    Award,
    Clock,
    Sliders,
    ArrowLeftRight,
    Wrench,
    ClipboardCheck
} from 'lucide-vue-next'

export const SIDEBAR_MENU = [
    {
        id: 'main',
        label: 'MAIN',
        icon: Home,
        path: '/'
    },
    {
        id: 'dashboard',
        label: '현황판',
        icon: LayoutDashboard,
        path: '/dashboard',
        hasSub: true
    },
    {
        id: 'base-info',
        label: '기준정보',
        icon: CreditCard,
        path: '/base-info',
        hasSub: true
    },
    {
        id: 'order-plan',
        label: '수주/계획관리',
        icon: ClipboardList,
        path: '/order-plan',
        hasSub: true
    },
    {
        id: 'purchase',
        label: '구매관리',
        icon: ShoppingCart,
        path: '/purchase',
        hasSub: true,
        children: [
            {
                id: 'po',
                label: '발주관리',
                hasSub: true,
                children: [
                    { id: 'vendor-order', label: '비정규 발주', path: '/purchase/vendor' },
                    { id: 'regular-order', label: '정규발주', path: '/purchase/regular' },
                    { id: 'order-status', label: '발주현황', path: '/purchase/status' }
                ]
            },
            {
                id: 'shipping-out',
                label: '출발관리',
                type: 'plus',
                path: '/shipping-out'
            },
            {
                id: 'material-io',
                label: '자재입출고관리',
                type: 'plus',
                path: '/material-io'
            },
            {
                id: 'material-release',
                label: '자재불출',
                type: 'plus',
                path: '/material-release'
            },
            {
                id: 'inventory',
                label: '재고관리',
                type: 'plus',
                path: '/inventory'
            }
        ]
    },
    {
        id: 'process',
        label: '공정관리',
        icon: Settings,
        path: '/process',
        hasSub: true
    },
    {
        id: 'shipping',
        label: '출하관리',
        icon: Truck,
        path: '/shipping',
        hasSub: true
    },
    {
        id: 'quality',
        label: '품질관리',
        icon: Award,
        path: '/quality',
        hasSub: true
    },
    {
        id: 'closing',
        label: '마감관리',
        icon: Clock,
        path: '/closing',
        hasSub: true
    },
    {
        id: 'common',
        label: '공통관리',
        icon: Sliders,
        path: '/board',
        hasSub: true
    },
    {
        id: 'b2bi',
        label: 'B2BI Interface',
        icon: ArrowLeftRight,
        path: '/b2bi',
        hasSub: true
    },
    {
        id: 'admin',
        label: '관리자',
        icon: Wrench,
        path: '/admin',
        hasSub: true
    },
    {
        id: 'project',
        label: '프로젝트관리',
        icon: ClipboardCheck,
        path: '/project',
        hasSub: true
    }
]