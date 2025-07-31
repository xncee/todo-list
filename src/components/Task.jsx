import {useState, useEffect} from 'react';
import { CiEdit, CiTrash } from "react-icons/ci";
import { useTheme } from '../context/ThemeContext';
import styles from './ToDo.module.css';

function Task(props) {
	const { theme } = useTheme();
    const [editText, setEditText] = useState(props.text);
    const [isEditing, setEditing] = useState(false);

	const handleInputChange = (e) => {
        setEditText(e.target.value);
    }
	const handleEdit = () => {
		if (!isEditing) setEditing(true)
	};
    const handleStatus = () => {
        props.changeStatus(!props.isCompleted);
    };

    const handleBlur = () => {
        setEditing(false);
        const trimmedText = editText.trim();
        setEditText(trimmedText);
        props.onEdit(trimmedText);
    };

	// to keep editText in sync with props.text
	// when props.text changes, the edit text will change as well
	// not really neccassary as you are already updating the editText as you type
	// needed if the parent component (where you render Task) changes the text of some task in runtime (not our case)
	useEffect(() => {
		setEditText(props.text);
	}, [props.text]);

    useEffect(() => {
        if (!isEditing) return;

        const handleKeyPress = (e) => {
            if (e.code === 'Enter') handleBlur();
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, editText]);

    return (
        <div
			className={styles.task}
			onDoubleClick={handleEdit}
		>
			<input
				className={styles.taskCheckBox}
				type="checkbox"
				checked={props.isCompleted}
				onChange={handleStatus}
			/>
			<div
				className={styles.taskContent}
			>
				{
				isEditing
				?
					<textarea
						className={`${styles.taskContent} ${styles.taskEdit}`}
						size={Math.max(2, editText.length)}
						type='text'
						value={editText}
						onChange={handleInputChange}
						onBlur={handleBlur}
						autoFocus
					/>
				:
					<span
						style={{
							color: props.isCompleted && theme.secondary,
							textDecoration: props.isCompleted && "line-through"
						}}
					>
						{props.text}
					</span>
				}
			</div>
			<div className={styles.buttonGroup}>
				<button
					className={styles.controlButton}
					onClick={handleEdit}
				>
					<CiEdit size={18}/>
				</button>
				<button
					className={[styles.controlButton, styles.deleteButton].join(' ')}
					onClick={props.onDelete}
				>
					<CiTrash size={18}/>
				</button>
			</div>
        </div>
    );
}

export default Task;