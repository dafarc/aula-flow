export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  studentsCount: number;
  modulesCount: number;
  lessonsCount: number;
  progress?: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'quiz';
  duration?: string;
  videoUrl?: string;
  isLive?: boolean;
  liveDate?: string;
  completed?: boolean;
  watchProgress?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  classId: string;
  progress: number;
  lastActive: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  courseId: string;
  studentsCount: number;
  startDate: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  courseName: string;
  date: string;
  time: string;
  type: 'live' | 'deadline' | 'recording';
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Marketing Digital Avançado',
    description: 'Domine as estratégias mais avançadas de marketing digital para alavancar seus resultados.',
    thumbnail: '',
    studentsCount: 128,
    modulesCount: 5,
    lessonsCount: 32,
  },
  {
    id: '2',
    title: 'Desenvolvimento Web Fullstack',
    description: 'Aprenda a criar aplicações web completas do zero ao deploy.',
    thumbnail: '',
    studentsCount: 95,
    modulesCount: 8,
    lessonsCount: 56,
  },
  {
    id: '3',
    title: 'Design UX/UI Profissional',
    description: 'Crie interfaces incríveis e experiências memoráveis para seus usuários.',
    thumbnail: '',
    studentsCount: 67,
    modulesCount: 4,
    lessonsCount: 24,
  },
];

export const mockModules: Module[] = [
  {
    id: 'm1',
    courseId: '1',
    title: 'Fundamentos do Marketing Digital',
    order: 1,
    lessons: [
      { id: 'l1', moduleId: 'm1', title: 'Introdução ao Marketing Digital', description: 'Conceitos básicos', type: 'video', duration: '15:30', completed: true, watchProgress: 100 },
      { id: 'l2', moduleId: 'm1', title: 'Funil de Vendas', description: 'Entenda o funil completo', type: 'video', duration: '22:10', completed: true, watchProgress: 100 },
      { id: 'l3', moduleId: 'm1', title: 'Material de Apoio - Módulo 1', description: 'PDF com resumo', type: 'pdf', completed: false },
      { id: 'l4', moduleId: 'm1', title: 'Quiz - Fundamentos', description: 'Teste seus conhecimentos', type: 'quiz', completed: false },
    ],
  },
  {
    id: 'm2',
    courseId: '1',
    title: 'Tráfego Pago',
    order: 2,
    lessons: [
      { id: 'l5', moduleId: 'm2', title: 'Google Ads do Zero', description: 'Configure sua primeira campanha', type: 'video', duration: '35:00', completed: false, watchProgress: 45 },
      { id: 'l6', moduleId: 'm2', title: 'Facebook Ads Avançado', description: 'Estratégias avançadas', type: 'video', duration: '28:15', completed: false, watchProgress: 0 },
    ],
  },
  {
    id: 'm3',
    courseId: '1',
    title: 'SEO e Conteúdo',
    order: 3,
    lessons: [
      { id: 'l7', moduleId: 'm3', title: 'SEO On-Page', description: 'Otimize suas páginas', type: 'video', duration: '20:00', completed: false, watchProgress: 0 },
    ],
  },
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Ana Silva', email: 'ana@email.com', avatar: '', classId: 'c1', progress: 85, lastActive: '2 horas atrás' },
  { id: 's2', name: 'Carlos Oliveira', email: 'carlos@email.com', avatar: '', classId: 'c1', progress: 62, lastActive: '1 dia atrás' },
  { id: 's3', name: 'Maria Santos', email: 'maria@email.com', avatar: '', classId: 'c1', progress: 94, lastActive: '30 min atrás' },
  { id: 's4', name: 'Pedro Costa', email: 'pedro@email.com', avatar: '', classId: 'c1', progress: 45, lastActive: '3 dias atrás' },
  { id: 's5', name: 'Julia Ferreira', email: 'julia@email.com', avatar: '', classId: 'c2', progress: 78, lastActive: '5 horas atrás' },
];

export const mockClasses: ClassGroup[] = [
  { id: 'c1', name: 'Turma A - 2024', courseId: '1', studentsCount: 35, startDate: '15 Jan 2024' },
  { id: 'c2', name: 'Turma B - 2024', courseId: '1', studentsCount: 28, startDate: '01 Mar 2024' },
  { id: 'c3', name: 'Turma Fullstack 01', courseId: '2', studentsCount: 42, startDate: '10 Fev 2024' },
];

export const mockEvents: UpcomingEvent[] = [
  { id: 'e1', title: 'Aula ao Vivo - Tráfego Pago', courseName: 'Marketing Digital', date: '2024-03-25', time: '19:00', type: 'live' },
  { id: 'e2', title: 'Entrega do Projeto Final', courseName: 'Dev Web Fullstack', date: '2024-03-28', time: '23:59', type: 'deadline' },
  { id: 'e3', title: 'Gravação Disponível - SEO', courseName: 'Marketing Digital', date: '2024-03-22', time: '10:00', type: 'recording' },
  { id: 'e4', title: 'Mentoria em Grupo', courseName: 'Design UX/UI', date: '2024-03-26', time: '20:00', type: 'live' },
];

export const dashboardStats = {
  totalStudents: 290,
  totalCourses: 3,
  totalLessons: 112,
  avgAttendance: 87,
  lessonsThisWeek: 8,
  completionRate: 72,
};
