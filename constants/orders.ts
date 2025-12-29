// Orders-related constants and mock data

export type OrderStatus = "ongoing" | "awaiting" | "completed" | "cancelled";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Checklist = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Nanny = {
  id: string;
  name: string;
  avatar: string;
};

export type OngoingOrder = {
  id: string;
  nanny: Nanny;
  date: string;
  startTime: string;
  endTime: string;
  status: "ongoing" | "awaiting";
  checklists: Checklist[];
  completedTasks: number;
  totalTasks: number;
};

export type PastOrder = {
  id: string;
  nanny?: Nanny;
  date: string;
  startTime: string;
  endTime: string;
  status: "completed" | "cancelled";
  address: string;
  orderNumber: string;
  month: string;
  year: string;
};

export type OrderDetail = {
  id: string;
  nanny: Nanny;
  date: string;
  status: "completed" | "cancelled";
  timeSpent?: string;
  subtotal: number;
  vat: number;
  serviceCharge: number;
  discount: number;
  total: number;
  paymentMethod: string;
  checklists: Checklist[];
  completedTasks: number;
  totalTasks: number;
  cancellationFee?: number;
  refundAmount?: number;
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "nanny";
  timestamp: string;
};

// Mock ongoing orders
export const MOCK_ONGOING_ORDER: OngoingOrder = {
  id: "1",
  nanny: {
    id: "n1",
    name: "Mary Jane",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  date: "Today",
  startTime: "08:30AM",
  endTime: "06:00PM",
  status: "ongoing",
  completedTasks: 2,
  totalTasks: 16,
  checklists: [
    {
      id: "c1",
      title: "Morning Session",
      tasks: [
        { id: "t1", title: "First bath", completed: true },
        { id: "t2", title: "Breakfast", completed: true },
        { id: "t3", title: "Pick from school", completed: false },
        { id: "t4", title: "Second bath", completed: false },
        { id: "t5", title: "Lunch", completed: false },
        { id: "t6", title: "Playground", completed: false },
      ],
    },
    {
      id: "c2",
      title: "Checklist 2",
      tasks: [
        { id: "t7", title: "Afternoon snack", completed: false },
        { id: "t8", title: "Homework help", completed: false },
        { id: "t9", title: "Dinner preparation", completed: false },
        { id: "t10", title: "Evening bath", completed: false },
      ],
    },
  ],
};

export const MOCK_AWAITING_ORDER: OngoingOrder = {
  id: "2",
  nanny: {
    id: "n1",
    name: "Mary Jane",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  date: "Today",
  startTime: "08:30AM",
  endTime: "06:00PM",
  status: "awaiting",
  completedTasks: 0,
  totalTasks: 0,
  checklists: [],
};

// Mock past orders
export const MOCK_PAST_ORDERS: PastOrder[] = [
  {
    id: "p1",
    nanny: {
      id: "n1",
      name: "Mary Jane",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "13 Jul",
    startTime: "08:30AM",
    endTime: "06:00PM",
    status: "completed",
    address: "15a Capt. Ofajide George Lekki Phase 1",
    orderNumber: "34,459",
    month: "July",
    year: "2025",
  },
  {
    id: "p2",
    date: "13 Jul",
    startTime: "08:30AM",
    endTime: "06:00PM",
    status: "cancelled",
    address: "15a Capt. Ofajide George Lekki Phase 1",
    orderNumber: "34,459",
    month: "July",
    year: "2025",
  },
  {
    id: "p3",
    nanny: {
      id: "n1",
      name: "Mary Jane",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "13 Jul",
    startTime: "08:30AM",
    endTime: "06:00PM",
    status: "completed",
    address: "15a Capt. Ofajide George Lekki Phase 1",
    orderNumber: "34,459",
    month: "July",
    year: "2025",
  },
  {
    id: "p4",
    date: "13 Jul",
    startTime: "08:30AM",
    endTime: "06:00PM",
    status: "cancelled",
    address: "15a Capt. Ofajide George Lekki Phase 1",
    orderNumber: "34,459",
    month: "July",
    year: "2025",
  },
];

// Mock order details
export const MOCK_ORDER_DETAIL_COMPLETED: OrderDetail = {
  id: "p1",
  nanny: {
    id: "n1",
    name: "Mary Jane",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  date: "Wed, Jul 1, 2025",
  status: "completed",
  timeSpent: "04:56:34",
  subtotal: 50,
  vat: 4.21,
  serviceCharge: 6.25,
  discount: 6.25,
  total: 60.46,
  paymentMethod: "Card payment",
  completedTasks: 22,
  totalTasks: 24,
  checklists: [
    {
      id: "c1",
      title: "Morning Session",
      tasks: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `t${i}`,
          title: `Task ${i + 1}`,
          completed: true,
        })),
    },
    {
      id: "c2",
      title: "Morning Session",
      tasks: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `t${i + 12}`,
          title: `Task ${i + 13}`,
          completed: i < 10,
        })),
    },
  ],
};

export const MOCK_ORDER_DETAIL_CANCELLED: OrderDetail = {
  id: "p2",
  nanny: {
    id: "n1",
    name: "Mary Jane",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  date: "Wed, Jul 1, 2025",
  status: "cancelled",
  subtotal: 50,
  vat: 4.21,
  serviceCharge: 6.25,
  discount: 6.25,
  total: 60.46,
  paymentMethod: "Card payment",
  completedTasks: 0,
  totalTasks: 0,
  checklists: [],
  cancellationFee: 6.25,
  refundAmount: 54.25,
};

// Mock chat messages
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    text: "Hello",
    sender: "nanny",
    timestamp: "Yesterday 4:59 PM",
  },
  {
    id: "m2",
    text: "I need your services",
    sender: "user",
    timestamp: "Yesterday 4:59 PM",
  },
  {
    id: "m3",
    text: "When are you to for a one week gig?",
    sender: "user",
    timestamp: "Yesterday 4:59 PM",
  },
  {
    id: "m4",
    text: "Hello",
    sender: "nanny",
    timestamp: "Yesterday 5:09 PM",
  },
  {
    id: "m5",
    text: "Please refer to my calendar",
    sender: "nanny",
    timestamp: "Yesterday 6:59 PM",
  },
  {
    id: "m6",
    text: "Okay",
    sender: "user",
    timestamp: "Yesterday 6:59 PM",
  },
  {
    id: "m7",
    text: "Thank you",
    sender: "user",
    timestamp: "Today 6:59 AM",
  },
  {
    id: "m8",
    text: "Hello",
    sender: "nanny",
    timestamp: "Today 6:59 AM",
  },
  {
    id: "m9",
    text: "Do you have any availability?",
    sender: "nanny",
    timestamp: "Today 6:59 AM",
  },
  {
    id: "m10",
    text: "Hello",
    sender: "nanny",
    timestamp: "Today 6:59 AM",
  },
  {
    id: "m11",
    text: "Do you have any availability?",
    sender: "nanny",
    timestamp: "Today 6:59 AM",
  },
];

// Nanny-specific types
export type Client = {
  id: string;
  name: string;
  avatar: string;
};

export type NannyOngoingOrder = {
  id: string;
  client: Client;
  date: string;
  startTime: string;
  endTime: string;
  timeRemaining: string;
  checklists: Checklist[];
  completedTasks: number;
  totalTasks: number;
};

// Mock nanny ongoing order
export const MOCK_NANNY_ONGOING_ORDER: NannyOngoingOrder = {
  id: "no1",
  client: {
    id: "c1",
    name: "Jennifer Smith",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  date: "Today",
  startTime: "08:30AM",
  endTime: "06:00PM",
  timeRemaining: "04:56:34",
  completedTasks: 6,
  totalTasks: 17,
  checklists: [
    {
      id: "c1",
      title: "Morning Session",
      tasks: [
        { id: "t1", title: "First bath", completed: true },
        { id: "t2", title: "Breakfast", completed: true },
        { id: "t3", title: "Pick from school", completed: false },
        { id: "t4", title: "Second bath", completed: false },
        { id: "t5", title: "Lunch", completed: false },
        { id: "t6", title: "Playground", completed: false },
      ],
    },
    {
      id: "c2",
      title: "Morning Session",
      tasks: [
        { id: "t7", title: "Afternoon snack", completed: false },
        { id: "t8", title: "Homework help", completed: false },
        { id: "t9", title: "Dinner preparation", completed: false },
        { id: "t10", title: "Evening bath", completed: false },
        { id: "t11", title: "Bedtime story", completed: false },
      ],
    },
  ],
};

// Safety guide data
export type SafetyGuide = {
  id: string;
  image: string;
  title: string;
  gradientColor: string;
};

export const MOCK_SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: "sg1",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    title: "How to perform first aid for kids",
    gradientColor: "rgba(236, 72, 153, 0.85)", // Pink
  },
  {
    id: "sg2",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
    title: "How to handle a gas leak",
    gradientColor: "rgba(139, 92, 246, 0.85)", // Purple
  },
  {
    id: "sg3",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28",
    title: "How to perform CPR on kids",
    gradientColor: "rgba(34, 197, 94, 0.85)", // Green
  },
];
