import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

describe('reducer', () => {
  it('sets state as default parameter', () => {
    const state = reducer(undefined, addTask());
    const { newId, taskTitle, tasks } = state;

    expect(newId).toBe(100);
    expect(taskTitle).toBe('');
    expect(tasks).toHaveLength(0);
  });

  context('when action type is null', () => {
    it("doesn't change state", () => {
      const state = reducer({
        taskTitle: '안녕',
      }, { type: null });

      expect(state.taskTitle).toBe('안녕');
    });
  });

  context('with action type', () => {
    describe('updateTaskTitle', () => {
      it('changes tasktitle', () => {
        const state = reducer({
          taskTitle: '',
        }, updateTaskTitle('New Title'));

        expect(state.taskTitle).toBe('New Title');
      });
    });

    describe('addTask', () => {
      function reduceAddTask(taskTitle) {
        return reducer({
          newId: 100,
          taskTitle,
          tasks: [],
        }, addTask());
      }

      context('with task title', () => {
        it('appends a new task into tasks', () => {
          const state = reduceAddTask('New Task');

          expect(state.tasks).toHaveLength(1);
          expect(state.tasks[0].id).not.toBeUndefined();
          expect(state.tasks[0].title).toBe('New Task');
        });

        it('clears task title', () => {
          const state = reduceAddTask('New Task');

          expect(state.taskTitle).toBe('');
        });
      });

      context('without task title', () => {
        it("doesn't work", () => {
          const state = reduceAddTask('');

          expect(state.tasks).toHaveLength(0);
        });
      });
    });

    describe('deleteTask', () => {
      context('with existed taskID', () => {
        it('removes the task from tasks', () => {
          const state = reducer({
            tasks: [
              { id: 1, title: 'Task' },
            ],
          }, deleteTask(1));

          expect(state.tasks).toHaveLength(0);
        });
      });

      context('without existed task ID', () => {
        it("doesn't work", () => {
          const state = reducer({
            tasks: [
              { id: 1, title: 'Task' },
            ],
          }, deleteTask(100));

          expect(state.tasks).toHaveLength(1);
        });
      });
    });
  });
});
