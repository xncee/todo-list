import {useState, useEffect} from 'react';
import styles from './ToDo.module.css';
import Task from './Task';

const LOCAL_STORAGE_KEY = 'tasks';

export default function ToDoList() {
    const [newTask, setNewTask] = useState('');
	const [toDoList, setToDoList] = useState(() => {
		const storedList = localStorage.getItem(LOCAL_STORAGE_KEY);
		return storedList ? JSON.parse(storedList) : []
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList));
    }, [toDoList]);
	
	const handleInputChange = (e) => {
		setNewTask(e.target.value)
	};

	const addTask = () => {
		const trimmedTask = newTask.trim();
		
		if (trimmedTask === '') return;
		setToDoList([...toDoList, {text: trimmedTask, completed: false}]);
		setNewTask('');
	};

	const deleteTask = (i) => {
		setToDoList(
			toDoList.filter((_, index) => {
				return index !== i
			})
		);
		console.log(toDoList);
	};

	const changeTaskStatus = (i, status) => {
		setToDoList(
			toDoList.map((task, index) => {
				return (index === i
				? {...task, completed: status}
				: task);
			})
		);
	};
	const editTask = (i, newText) => {
		setToDoList(
			toDoList.map((task, index) => {
				return (index === i
				? {...task, text: newText}
				: task);
			})
		);
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>
				ToDo List
			</h1>
			<div className={styles.addTaskContainer}>
				<input
					className={styles.taskInput}
					placeholder='Enter you task'
					type="text"
					value={newTask}
					onChange={handleInputChange}
					onKeyDown={e => {
						if (e.code === 'Enter') addTask();
					}}
				/>
				<button
					className={styles.addTaskBtn}
					onClick={addTask}
				>
					Add task
				</button>
			</div>
			<div className={styles.tasksContainer}>
				{
					toDoList.map((task, i) => {
						return (
							<Task
								key={i}
								text={task["text"]}
								isCompleted={task["completed"]}
								changeStatus={(status) => {changeTaskStatus(i, status)}}
								onEdit={(newText) => {editTask(i, newText)}}
								onDelete={() => {deleteTask(i)}}
							/>
						);
					})
				}
			</div>
		</div>
	);
}