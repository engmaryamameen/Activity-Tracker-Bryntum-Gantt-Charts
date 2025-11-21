declare module '@bryntum/gantt/gantt.module.js' {
  export class Gantt {
    constructor(config?: any);
    destroy(): void;
    [key: string]: any;
  }
  export default Gantt;
}

declare module '@bryntum/gantt' {
  export * from '@bryntum/gantt/gantt.module.js';
}

