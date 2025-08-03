import {useState, useEffect} from 'react';
import styles from '../styles/css/ToDo.module.css';
import Task from './Task';

const LOCAL_STORAGE_KEY = 'tasks';

export default function ToDoList() {
	const [firstRender, setFirstRender] = useState(true);
    const [newTask, setNewTask] = useState('');
	const [toDoList, setToDoList] = useState(() => {
		const storedList = localStorage.getItem(LOCAL_STORAGE_KEY);
		return storedList ? JSON.parse(storedList) : []
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList));
    }, [toDoList]);
	
	// This effect will be triggered on first render only.
	// It sets a timeout to change firstRender state to false after all tasks are rendered.
	// Tasks are displayed with an animation and specific delay.
	// The animation should be applied only once, when the tasks are first rendered.
	// so we set firstRender state to false after the first render.
	// This way, the animation will not be applied again when the tasks are updated.
	// Check firstRender state usage in this component for more details.
	useEffect(() => {
    	setTimeout(() => {
        setFirstRender(false);
    }, toDoList.length*100 + 50); // (number of tasks * 0.1s delay) + buffer
	}, []);

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
					placeholder='Enter your task'
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
								animationDelay={firstRender ? i * 0.1 : 0}
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