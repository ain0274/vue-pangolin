import { 
    Settings, 
    ClipboardCheck, 
    Clock, 
    ShoppingCart, 
    CircleDollarSign 
} from 'lucide-vue-next';

export const METRIC_CARDS = [
    {
        id: 'equipment',
        title: '설비가동률',
        icon: Settings,
        rate: 68,
        color: '#3fb27f',
        bgColor: '#EAF7F3',
        target: 100,
        actual: 68
    },
    {
        id: 'order',
        title: '발주/입고율',
        icon: ClipboardCheck,
        rate: 35,
        color: '#f0568c',
        bgColor: '#FDEEF2',
        target: 55,
        actual: 15
    },
    {
        id: 'plan',
        title: '계획대비 실적율',
        icon: Clock,
        rate: 75,
        color: '#7b7fe0',
        bgColor: '#F1F0FC',
        target: 100,
        actual: 75
    },
    {
        id: 'shipment',
        title: '주문대비 출하율',
        icon: ShoppingCart,
        rate: 25,
        color: '#f5a623',
        bgColor: '#FEF5E7',
        target: 50,
        actual: 13
    },
    {
        id: 'sales',
        title: '매입/매출(금액)',
        icon: CircleDollarSign,
        rate: 50,
        color: '#4fa8e8',
        bgColor: '#EAF4FB',
        target: 50,
        actual: 25
    }
];