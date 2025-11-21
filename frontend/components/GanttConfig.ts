'use client';

const API_BASE_URL = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 
  'http://localhost:3001/api';

export const ganttConfig: any = {
  project: {
    autoSetConstraints: true,
    autoLoad: true,
    autoSync: true,
    loadUrl: `${API_BASE_URL}/load`,
    syncUrl: `${API_BASE_URL}/sync`,
    validateResponse: true,
    taskStore: {
      transformFlatData: true,
      wbsMode: 'auto'
    },
    stm: {
      autoRecord: true
    },
    resetUndoRedoQueuesAfterLoad: true
  },
  
  startDate: '2024-01-01',
  endDate: '2024-02-28',
  
  viewPreset: 'weekAndDayLetter',
  barMargin: 10,
  rowHeight: 50,
  
  dependencyIdField: 'wbsCode',
  showDirty: true,
  
  selectionMode: {
    cell: true,
    dragSelect: true,
    rowNumber: true
  },
  
  columns: [
    { type: 'wbs', hidden: true },
    { 
      type: 'name', 
      width: 300, 
      showWbs: true,
      editor: {
        type: 'textfield'
      }
    },
    { type: 'startdate', width: 120 },
    { type: 'duration', width: 100 },
    { type: 'percentdone', mode: 'circle', width: 70 },
    { type: 'predecessor', width: 112 },
    { type: 'successor', width: 112 },
    { type: 'schedulingmodecolumn', width: 120 },
    { type: 'calendar', width: 100 },
    { type: 'constrainttype', width: 120 },
    { type: 'constraintdate', width: 120 },
    { type: 'deadlinedate', width: 120 },
    { type: 'addnew' }
  ],
  
  subGridConfigs: {
    locked: {
      flex: 3
    },
    normal: {
      flex: 4
    }
  },
  
  columnLines: true,
  rowLines: true,
  
  showTaskColorPickers: true,
  
  features: {
    projectEdit: true,
    dependencies: {
      showLagInTooltip: true,
      radius: 3,
      clickWidth: 5
    },
    dependencyEdit: true,
    filter: true,
    labels: {
      before: {
        field: 'name',
        editor: {
          type: 'textfield'
        }
      }
    },
    taskMenu: {
      items: {
        addTask: {
          text: 'Add task',
          onItem({ taskRecord }: any) {
            const gantt = (this as any).up('gantt');
            if (!gantt) return;
            const newTask = taskRecord.appendChild({
              name: 'New task',
              duration: 1
            });
            gantt.project.commitAsync().then(() => {
              gantt.scrollRowIntoView(newTask);
              gantt.features.cellEdit.startEditing({
                record: newTask,
                field: 'name'
              });
            });
          }
        },
        processItems({ taskRecord, items }: any) {
          if (taskRecord.isMilestone) {
            items.convertToMilestone = false;
          }
          if (taskRecord.isParent) {
            items.convertToMilestone = false;
          }
        },
        indentTask: true,
        outdentTask: true,
        deleteTask: true,
        cutTask: true,
        copyTask: true,
        pasteTask: true,
        duplicateTask: true,
        splitTask: true,
        addDependency: true,
        convertToMilestone: {
          text: 'Convert to milestone',
          weight: 600
        },
        editTask: {
          text: 'Edit task'
        },
        scrollToTask: true,
        expandToFitTask: true
      }
    },
    taskEdit: {
      items: {
        generalTab: {
          items: {
            name: { type: 'textfield' },
            startDate: { type: 'datefield' },
            endDate: { type: 'datefield' },
            duration: { type: 'numberfield' },
            percentDone: { type: 'numberfield' },
            effort: { type: 'numberfield' },
            schedulingMode: { type: 'combo' },
            calendar: { type: 'combo' },
            constraintType: { type: 'combo' },
            constraintDate: { type: 'datefield' },
            deadline: { type: 'datefield' },
            note: { type: 'textareafield' }
          }
        },
        predecessorsTab: true,
        successorsTab: true,
        resourcesTab: true,
        advancedTab: {
          items: {
            manuallyScheduled: { type: 'checkbox' },
            effortDriven: { type: 'checkbox' },
            ignoreResourceCalendar: { type: 'checkbox' },
            inactive: { type: 'checkbox' }
          }
        }
      }
    },
    cellEdit: {
      addNewAtEnd: false
    },
    fillHandle: true,
    cellCopyPaste: true,
    taskCopyPaste: {
      useNativeClipboard: true
    },
    taskDrag: {
      dragAllSelectedTasks: true
    },
    rowResize: {
      cellSelector: '.b-sequence-cell'
    },
    rowReorder: {
      disabled: true
    },
    timeRanges: {
      showCurrentTimeLine: true
    },
    baselines: {
      disabled: true
    },
    parentArea: {
      disabled: true
    },
    progressLine: {
      disabled: true
    },
    rollups: {
      disabled: true
    }
  },
  
  tbar: {
    items: {
      addTask: {
        type: 'button',
        color: 'b-green',
        icon: 'b-fa b-fa-plus',
        text: 'Create',
        tooltip: 'Create new task',
        onAction() {
          const gantt = (this as any).up('gantt');
          const newTask = gantt.taskStore.rootNode.appendChild({
            name: 'New task',
            duration: 1
          });
          gantt.project.commitAsync().then(() => {
            gantt.scrollRowIntoView(newTask);
            gantt.features.cellEdit.startEditing({
              record: newTask,
              field: 'name'
            });
          });
        }
      },
      undoRedo: {
        type: 'undoredo',
        items: {
          transactionsCombo: null
        }
      },
      expandAll: {
        type: 'button',
        icon: 'b-fa b-fa-angle-double-down',
        tooltip: 'Expand all',
        onAction() {
          (this as any).up('gantt').expandAll();
        }
      },
      collapseAll: {
        type: 'button',
        icon: 'b-fa b-fa-angle-double-up',
        tooltip: 'Collapse all',
        onAction() {
          (this as any).up('gantt').collapseAll();
        }
      },
      zoomIn: {
        type: 'button',
        icon: 'b-fa b-fa-search-plus',
        tooltip: 'Zoom in',
        onAction() {
          (this as any).up('gantt').zoomIn();
        }
      },
      zoomOut: {
        type: 'button',
        icon: 'b-fa b-fa-search-minus',
        tooltip: 'Zoom out',
        onAction() {
          (this as any).up('gantt').zoomOut();
        }
      },
      zoomToFit: {
        type: 'button',
        icon: 'b-fa b-fa-compress-arrows-alt',
        tooltip: 'Zoom to fit',
        onAction() {
          (this as any).up('gantt').zoomToFit({
            leftMargin: 50,
            rightMargin: 50
          });
        }
      },
      previousButton: {
        type: 'button',
        icon: 'b-fa b-fa-angle-left',
        tooltip: 'Previous time span',
        onAction() {
          (this as any).up('gantt').shiftPrevious();
        }
      },
      nextButton: {
        type: 'button',
        icon: 'b-fa b-fa-angle-right',
        tooltip: 'Next time span',
        onAction() {
          (this as any).up('gantt').shiftNext();
        }
      },
      spacer: {
        type: 'widget',
        cls: 'b-toolbar-fill'
      },
      filterByName: {
        type: 'textfield',
        cls: 'filter-by-name',
        flex: '0 0 13.5em',
        label: 'Find tasks by name',
        placeholder: 'Find tasks by name',
        clearable: true,
        keyStrokeChangeDelay: 100,
        triggers: {
          filter: {
            align: 'end',
            cls: 'b-fa b-fa-filter'
          }
        },
        onChange({ value }: any) {
          const gantt = (this as any).up('gantt');
          if (value === '') {
            gantt.taskStore.clearFilters();
          } else {
            const regex = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            gantt.taskStore.filter({
              filters: (task: any) => task.name && task.name.match(regex),
              replace: true
            });
          }
        }
      }
    }
  }
};

