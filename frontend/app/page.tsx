import dynamic from 'next/dynamic';

const Gantt = dynamic(() => import('../components/Gantt'), { ssr: false });

export default function Home() {
  return <Gantt />;
}

