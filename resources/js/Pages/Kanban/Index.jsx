import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "@/Components/TaskModal";
import AddTaskModal from "@/Components/AddTaskModal";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
    const [columnOrder, setColumnOrder] = useState(["backlog", "waiting", "done"]);

    // State untuk modal TaskModal
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // State untuk modal AddTaskModal
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    // state untuk modal DeleteModal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(""); // Untuk judul modal


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

    const openTaskModal = (task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    const openAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };

    const closeAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
    };

    const openDeleteModal = (title) => {
        setModalTitle(title); // Set judul modal sesuai nama kolom atau task
        setIsDeleteModalOpen(true); // Buka modal
    };
    
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false); // Tutup modal
    };
    

    const renderPriorityIcon = (priority) => {
        return (
            <div
                className={`absolute top-0 left-0 h-full w-2 rounded-l ${
                    priority === "High"
                        ? "bg-red-500"
                        : priority === "Medium"
                        ? "bg-yellow-500"
                        : priority === "Low"
                        ? "bg-green-500"
                        : "bg-gray-300"
                }`}
            ></div>
        );
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
        <AuthenticatedLayout>
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
                                                            className="mb-3 text-lg font-semibold text-gray-100 cursor-move w-full bg-blue-500 p-2 rounded"
                                                        >
                                                            {column.name}
                                                            <button
                                                                className="float-end text-gray-100 hover:text-gray-400"
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // Prevent opening the modal
                                                                    openDeleteModal(`Delete Card: ${column.name}`);
                                                                    // deleteTask(columnId, task.id);
                                                                }}
                                                            >
                                                                <FaRegTrashAlt  className="my-1 w-5 h-5"/>
                                                            </button>
                                                        </div>
                                                        
                                                        <Droppable
                                                            droppableId={columnId}
                                                            type="TASK"
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                    className={`min-h-0 p-2 border rounded ${
                                                                        column.tasks.length === 0
                                                                            ? "border-dashed border-transparent"
                                                                            : "border-transparent"
                                                                    }`}
                                                                >
                                                                    {column.tasks.map((task, index) => (
                                                                        <Draggable
                                                                            draggableId={task.id}
                                                                            index={index}
                                                                            key={task.id}
                                                                        >
                                                                            {(provided, snapshot) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className={`relative bg-gray-50 p-3 rounded shadow mb-3 cursor-pointer transition-transform duration-200 ${
                                                                                        snapshot.isDragging
                                                                                            ? "bg-blue-100 scale-105"
                                                                                            : ""
                                                                                    }`}
                                                                                    onClick={() => openTaskModal(task)}
                                                                                >
                                                                                    
                                                                                    <div className="flex justify-between ">
                                                                                        <span className="ml-2">{task.title}</span>
                                                                                        {renderPriorityIcon(task.priority)}
                                                                                    </div>
                                                                                    {task.checklist.length > 0 && (
                                                                                        <div className="ml-2">{renderChecklist(task.checklist)}</div>
                                                                                    )}
        
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                    <div className="flex justify-center p-1">
                                        {/* form add task card ketika dienter maka akan membuat task card  */}
                                        <form autoComplete='off' className=''>
                                            <input maxLength='20' className='truncate bg-white placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-1 focus:ring-indigo-500' type="text" name='newCol' placeholder='Add a new Task Card' />
                                        </form>
                                    </div>
                                </div>
                            )}
                        
                            
                        </Droppable>
                    </DragDropContext>
        
        
                    <button
                        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-3xl"
                        onClick={openAddTaskModal}
                    >
                        +
                    </button>
        
                    <TaskModal
                        isOpen={isTaskModalOpen}
                        onClose={closeTaskModal}
                        task={selectedTask}
                    />
                    <AddTaskModal
                        isOpen={isAddTaskModalOpen}
                        onClose={closeAddTaskModal}
                    />
        
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        onDelete={() => {
                            console.log("Delete action triggered");
                            closeDeleteModal(); // Tutup modal setelah menghapus
                        }}
                        title={modalTitle}
                    />
        
                </div>

        </AuthenticatedLayout>
        
        
    );
}

export default Kanban;

