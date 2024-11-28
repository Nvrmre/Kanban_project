import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../../Components/TaskModal";
import AddTaskModal from "../../Components/AddTaskModal";

const initialColumns = {
    backlog: {
        id: "backlog",
        name: "Backlog",
        tasks: [
            {
                id: "1",
                title: "Welcome to Agilix 🙌",
                description:
                    "Agilix is a Kanban planner that helps you to focus on what matters most.",
                priority: "Low",
                status: "Backlog",
                dateAdded: "11/28/2024",
                checklist: [],
            },
            {
                id: "2",
                title: "Add a task checklist",
                description: "Tasks can have multiple steps to complete.",
                priority: "Medium",
                status: "Backlog",
                dateAdded: "11/28/2024",
                checklist: [
                    { id: "a", text: "Define the task", completed: false },
                    {
                        id: "b",
                        text: "Implement the feature",
                        completed: false,
                    },
                ],
            },
        ],
    },
    waiting: {
        id: "waiting",
        name: "Waiting",
        tasks: [
            {
                id: "3",
                title: "You can add detailed Descriptions.",
                description: "",
                priority: "High",
                status: "Waiting",
                dateAdded: "11/28/2024",
                checklist: [],
            },
            {
                id: "4",
                title: "Break tasks into steps",
                description: "",
                priority: "Medium",
                status: "Waiting",
                dateAdded: "11/28/2024",
                checklist: [
                    { id: "c", text: "Step 1", completed: true },
                    { id: "d", text: "Step 2", completed: false },
                    { id: "e", text: "Step 3", completed: false },
                ],
            },
        ],
    },
    done: {
        id: "done",
        name: "Done",
        tasks: [],
    },
};

function Kanban() {
    const [columns, setColumns] = useState(initialColumns);
    const [columnOrder, setColumnOrder] = useState([
        "backlog",
        "waiting",
        "done",
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const onDragEnd = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;

        if (type === "COLUMN") {
            const newColumnOrder = [...columnOrder];
            const [removed] = newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, removed);

            setColumnOrder(newColumnOrder);
        } else {
            const sourceColumn = columns[source.droppableId];
            const destinationColumn = columns[destination.droppableId];

            if (source.droppableId === destination.droppableId) {
                const newTasks = [...sourceColumn.tasks];
                const [removed] = newTasks.splice(source.index, 1);
                newTasks.splice(destination.index, 0, removed);

                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        tasks: newTasks,
                    },
                });
            } else {
                const sourceTasks = [...sourceColumn.tasks];
                const destinationTasks = [...destinationColumn.tasks];
                const [removed] = sourceTasks.splice(source.index, 1);
                destinationTasks.splice(destination.index, 0, removed);

                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        tasks: sourceTasks,
                    },
                    [destination.droppableId]: {
                        ...destinationColumn,
                        tasks: destinationTasks,
                    },
                });
            }
        }
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const [isModalOpenAddTask, setIsModalOpenAddTask] = useState(false);
    const openModalAddTask = () => {
        setIsModalOpenAddTask(true);
    };

    const closeModalAddTask = () => {
        setIsModalOpenAddTask(false);
    };

    const renderPriorityIcon = (priority) => {
        switch (priority) {
            case "High":
                return <span className="text-red-500">⬆</span>;
            case "Medium":
                return <span className="text-orange-500">➡</span>;
            case "Low":
                return <span className="text-green-500">⬇</span>;
            default:
                return null;
        }
    };

    const renderChecklist = (checklist) => {
        const completedCount = checklist.filter(
            (item) => item.completed
        ).length;
        return (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>☑️</span>
                <span>
                    {completedCount}/{checklist.length}
                </span>
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-semibold text-gray-700">
                Boards / Main Board
            </h1>
            <div className="mt-2 flex items-center space-x-2">
                <span className="text-gray-600">Show Priority:</span>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                    All
                </button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                    Hard
                </button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                    Medium
                </button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                    Low
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="COLUMN"
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex space-x-6 mt-4 overflow-x-auto"
                        >
                            {columnOrder.map((columnId, index) => {
                                const column = columns[columnId];
                                return (
                                    <Draggable
                                        draggableId={columnId}
                                        index={index}
                                        key={columnId}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                className="bg-white rounded shadow p-4 w-96 transition-transform duration-200 h-fit"
                                            >
                                                <div
                                                    {...provided.dragHandleProps}
                                                    className="mb-4 text-lg font-semibold text-blue-600 cursor-move w-60"
                                                >
                                                    {column.name}
                                                </div>
                                                <Droppable
                                                    droppableId={columnId}
                                                    type="TASK"
                                                >
                                                    {(provided) => (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            className={`min-h-0 p-2 border rounded ${
                                                                column.tasks
                                                                    .length ===
                                                                0
                                                                    ? "border-dashed border-transparent"
                                                                    : "border-transparent"
                                                            }`}
                                                        >
                                                            {column.tasks.map(
                                                                (
                                                                    task,
                                                                    index
                                                                ) => (
                                                                    <Draggable
                                                                        draggableId={
                                                                            task.id
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        key={
                                                                            task.id
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided,
                                                                            snapshot
                                                                        ) => (
                                                                            <div
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className={`bg-gray-50 p-3 rounded shadow mb-3 cursor-pointer transition-transform duration-200 ${
                                                                                    snapshot.isDragging
                                                                                        ? "bg-blue-100 scale-105"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={() =>
                                                                                    openModal(
                                                                                        task
                                                                                    )
                                                                                }
                                                                            >
                                                                                <div className="flex justify-between">
                                                                                    <span>
                                                                                        {
                                                                                            task.title
                                                                                        }
                                                                                    </span>

                                                                                    {renderPriorityIcon(
                                                                                        task.priority
                                                                                    )}
                                                                                </div>
                                                                                {task
                                                                                    .checklist
                                                                                    .length >
                                                                                    0 &&
                                                                                    renderChecklist(
                                                                                        task.checklist
                                                                                    )}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                            <div className="pt-4">
                                <input
                                    className="bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl text-base w-44"
                                    type="text"
                                    placeholder="Add New Column"
                                />
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="fixed bottom-4 right-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-3xl"
                    onClick={openModalAddTask}
                >
                    +
                </button>
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                task={selectedTask}
            />
            <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Kanban;
