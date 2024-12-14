import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "@/Components/TaskModal";
import AddTaskModal from "@/Components/AddTaskModal";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt,FaPen } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditCardModal from "@/Components/EditCardModal";
import { Head } from '@inertiajs/react';


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
                comments: [
                    { id: "c1", name: "John Doe", text: "Great start!" },
                    { id: "c2", name: "Jane Smith", text: "I like this feature!" },
                ],
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
                comments: [{ id: "c4", name: "Bob Lee", text: "Looks good so far." }],
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
                comments: [],
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
                comments: [{ id: "c4", name: "Bob Lee", text: "Looks good so far." }],
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

    // state unutk modal edit    cover board
    const [isColorModalOpen, setIsColorModalOpen] = useState(false); // Untuk membuka modal
    const [selectedColumnId, setSelectedColumnId] = useState(null); // Menyimpan ID kolom yang sedang diubah warna
    const [columnColors, setColumnColors] = useState({});

    // state untuk filter
    const [selectedPriority, setSelectedPriority] = useState("All");

    // state untuk new board
    const [newBoardName, setNewBoardName] = useState("");

   




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

    const openColorModal = (columnId) => {
        setSelectedColumnId(columnId);
        setIsColorModalOpen(true);
    };
    
    const closeColorModal = () => {
        setIsColorModalOpen(false);
        setSelectedColumnId(null);
    };
    
    const changeColumnColor = (color) => {
        if (selectedColumnId) {
            setColumnColors((prevColors) => ({
                ...prevColors,
                [selectedColumnId]: color,
            }));
        }
        closeColorModal(); 
    };

     const handleAddBoard = (e) => {
        e.preventDefault();
        if (newBoardName.trim() === "") return;

        const newColumnId = newBoardName.toLowerCase().replace(/\s+/g, "-");
        const newColumn = {
            id: newColumnId,
            name: newBoardName,
            tasks: [],
        };

        setColumns((prevColumns) => ({
            ...prevColumns,
            [newColumnId]: newColumn,
        }));

        setColumnOrder((prevOrder) => [...prevOrder, newColumnId]);
        setNewBoardName(""); // Clear input after adding
    };

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
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

            <Head title="Kanban" />

            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-xl font-semibold text-gray-700">
                    Boards / Main Board  
                    {/* ini nanti "Main Board akan diganti sama kayak judul board yang nantinya user buat" */}
                </h1>
                
                <div className="mt-2 flex items-center space-x-2">
                    <span className="text-gray-600">Show Priority:</span>
                        <button
                            className={`px-3 py-1 text-sm ${selectedPriority === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded`}
                            onClick={() => handlePriorityClick("All")}
                        >
                        All
                        </button>
                        <button
                            className={`px-3 py-1 text-sm ${selectedPriority === "High" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded`}
                            onClick={() => handlePriorityClick("High")}
                        >
                        High
                        </button>
                        <button
                            className={`px-3 py-1 text-sm ${selectedPriority === "Medium" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded`}
                            onClick={() => handlePriorityClick("Medium")}
                        >
                        Medium
                        </button>
                        <button
                            className={`px-3 py-1 text-sm ${selectedPriority === "Low" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded`}
                            onClick={() => handlePriorityClick("Low")}
                        >
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
                                                               className={`mb-3 text-lg font-semibold text-gray-100 cursor-move w-full p-2 rounded`}
                                                               style={{
                                                                   backgroundColor: columnColors[column.id] || "#3b82f6", // Warna default biru
                                                               }}
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

                                                            <button
                                                                className="float-end text-gray-100 hover:text-gray-400 me-2"
                                                                onClick={(e) => {
                                                                e.stopPropagation();
                                                                openColorModal(columnId);
                                                                }}
                                                            >
                                                                <FaPen className="my-1 w-5 h-5"/>
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
                                                                    {column.tasks.map((task, index) => {
                                                                         // state filter priority
                                                                            const isHighlighted = selectedPriority === "All" || task.priority === selectedPriority;
                                                                        return (
                                                                            <Draggable 
                                                                            draggableId={task.id} 
                                                                            index={index} 
                                                                            key={task.id}>
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        className={`relative bg-gray-50 p-3 rounded shadow mb-3 cursor-pointer transition-transform duration-200 
                                                                                        ${snapshot.isDragging ? "bg-blue-100 scale-105" : ""}
                                                                                        ${isHighlighted ? "opacity-100" : "opacity-50"}`}
                                                                                        
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
                                                                        );
                                                                    })}
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
                                        {/* form add board ketika dienter maka akan membuat Board */}
                                        <form autoComplete='off'onSubmit={handleAddBoard} className=''>
                                            <input 
                                            maxLength='20' 
                                            className='truncate bg-white placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-1 focus:ring-indigo-500' 
                                            type="text" 
                                            name='newCol' 
                                            placeholder='Add a new Board'
                                            value={newBoardName}
                                            onChange={(e) => setNewBoardName(e.target.value)}
                                            />
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
                    
                    <EditCardModal
                        isOpen={isColorModalOpen}
                        onClose={closeColorModal}
                        onSelectColor={changeColumnColor}
                    />

        
                </div>

        </AuthenticatedLayout>
        
        
    );
}

export default Kanban;


