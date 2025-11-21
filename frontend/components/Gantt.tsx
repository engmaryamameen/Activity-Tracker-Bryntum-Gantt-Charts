'use client';

import React, { useEffect, useRef } from 'react';
import { ganttConfig } from './GanttConfig';

const Gantt: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ganttInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || ganttInstanceRef.current) return;

    const initGantt = async () => {
      try {
        const { Gantt } = await import('@bryntum/gantt/gantt.module.js');
        
        if (Gantt && containerRef.current) {
          ganttInstanceRef.current = new Gantt({
            appendTo: containerRef.current,
            ...ganttConfig
          });
        }
      } catch (error) {
        console.error('Error loading Bryntum Gantt:', error);
      }
    };

    initGantt();

    return () => {
      if (ganttInstanceRef.current) {
        ganttInstanceRef.current.destroy();
        ganttInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="/themes/gantt.stockholm.css"
        data-bryntum-theme
      />
      <div ref={containerRef} style={{ flex: 1, minHeight: 0 }} />
    </>
  );
};

export default Gantt;

