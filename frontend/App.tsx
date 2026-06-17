import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useTaskDetail} from './src/features/tasks/hooks/useTaskDetail';
import {TaskDetailScreen} from './src/features/tasks/screens/TaskDetailScreen';
import {TaskListScreen} from './src/features/tasks/screens/TaskListScreen';
import {styles} from './src/styles/appStyles';

function App(): React.JSX.Element {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const {
    task: selectedTask,
    isLoading: isDetailLoading,
    error: detailError,
    loadTaskDetail,
    clearTaskDetail,
  } = useTaskDetail(selectedTaskId);

  const closeTaskDetail = () => {
    setSelectedTaskId(null);
    clearTaskDetail();
  };

  const taskId = selectedTaskId;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F7F9" />
      {taskId !== null ? (
        <TaskDetailScreen
          error={detailError}
          isLoading={isDetailLoading}
          task={selectedTask}
          taskId={taskId}
          onBack={closeTaskDetail}
          onRetry={loadTaskDetail}
        />
      ) : (
        <TaskListScreen onOpenTask={setSelectedTaskId} />
      )}
    </SafeAreaView>
  );
}

export default App;
