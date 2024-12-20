import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "@/Components/TaskModal";
import AddTaskModal from "@/Components/AddTaskModal";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditCardModal from "@/Components/EditCardModal";
import { Head } from "@inertiajs/react";
import ErrorBoundary from "@/error";

import { BsPersonFillAdd } from "react-icons/bs";
import AddMemberModal from "@/Components/AddMemberModal";
import PrimaryButton from "@/Components/PrimaryButton";

function Board({ boards, tasks, boardId, projectId }) {
    console.log("Boards:", boardId);
    console.log("Project:", projectId);

    const mergedTasksByBoard = boards.reduce((acc, board) => {
        acc[board.name] = {
            id: board.id,
            name: board.name,
            tasks: tasks.data.filter((task) => task.board_id === board.id),
        };
        return acc;
    }, {});

    boards.forEach((board) => {
        console.log(`Tasks for board ${board}`);
        const tasksForBoard = tasks.data.filter(
            (task) => task.board_id === board.id
        );
        console.log(`Tasks for board ${board.name}:`, tasksForBoard);
    });

    const columnOrder = boards.map((board) => board.name);

    const [columns, setColumns] = useState(mergedTasksByBoard);
    const [columnOrderState, setColumnOrderState] = useState(columnOrder);
    const [columnColors, setColumnColors] = useState({});
    const [selectedPriority, setSelectedPriority] = useState("All");

    // Modals
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const [newBoardName, setNewBoardName] = useState("");

    // Drag-and-Drop Handler
    const onDragEnd = (result) => {
        console.log(result);

        const { source, destination, type } = result;

        if (!destination) return;

        if (type === "COLUMN") {
            const newColumnOrder = [...columnOrderState];
            const [removed] = newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, removed);
            setColumnOrderState(newColumnOrder);
        } else {
            const sourceColumn = columns[source.droppableId];
            const destinationColumn = columns[destination.droppableId];

            // Same column task reorder
            if (source.droppableId === destination.droppableId) {
                const newTasks = [...sourceColumn.tasks];
                const [movedTask] = newTasks.splice(source.index, 1);
                newTasks.splice(destination.index, 0, movedTask);

                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        tasks: newTasks,
                    },
                });
            } else {
                // Moving task to another column
                const sourceTasks = [...sourceColumn.tasks];
                const destinationTasks = [...destinationColumn.tasks];
                const [movedTask] = sourceTasks.splice(source.index, 1);
                destinationTasks.splice(destination.index, 0, movedTask);

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

    // Task Modal Handlers
    const openTaskModal = (task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    // AddMember Modal Handlers
    // const openAddMemberModal = (member) => {
    //     setSelectedTask(task);
    //     setIsTaskModalOpen(true);
    // };

    // Add Board
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

        setColumnOrderState((prevOrder) => [...prevOrder, newColumnId]);
        setNewBoardName("");
    };

    // Change Column Color
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

    // delete modal
    const openDeleteModal = (title) => {
        setModalTitle(title); // Set judul modal sesuai nama kolom atau task
        setIsDeleteModalOpen(true); // Buka modal
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false); // Tutup modal
    };

    // Priority Filter
    const handlePriorityClick = (priority) => setSelectedPriority(priority);

    const renderPriorityIcon = (priority) => {
        return (
            <div
                className={`absolute top-0 left-0 h-full w-2 rounded-lg${
                    priority === "High"
                        ? "bg-red-500"
                        : priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                }`}
            ></div>
        );
    };

    return (
        <ErrorBoundary>
            <AuthenticatedLayout>
                <Head title="Board" />

                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-700">
                                Boards / Main Project
                            </h1>
                        </div>

                        {/* MODAL ADD MEMBER KALO GA JADI DIPAKE DI DELETE AJA  */}
                        {/* <div className="">
                            <PrimaryButton
                                onClick={() => setIsAddMemberModalOpen(true)}
                                className="mt-4"
                            >
                                <BsPersonFillAdd className="text-lg mr-2" /> Share
                            </PrimaryButton>
                        </div> */}
                    </div>

                    <div className="mt-2 flex items-center space-x-2">
                        <span className="text-gray-600 ">Show Priority:</span>
                        {["All", "high", "medium", "low"].map((priority) => (
                            <button
                                key={priority}
                                className={`px-3 py-1 text-sm font-semibold ${
                                    selectedPriority === priority
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                } rounded`}
                                onClick={() => handlePriorityClick(priority)}
                            >
                                {priority}
                            </button>
                        ))}
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
                                    {columnOrderState.map(
                                        (columnName, index) => {
                                            const column = columns[columnName];
                                            const tasks =
                                                selectedPriority === "All"
                                                    ? column.tasks
                                                    : column.tasks.filter(
                                                          (task) =>
                                                              task.priority ==
                                                              selectedPriority
                                                      );

                                            return (
                                                <Draggable
                                                    key={column.id}
                                                    draggableId={column.name}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            className="bg-white rounded shadow p-4 w-96 transition-transform duration-200 h-fit flex-shrink-0"
                                                        >
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="mb-3 text-lg font-semibold text-white cursor-move w-full p-2 rounded"
                                                                style={{
                                                                    backgroundColor:
                                                                        columnColors[
                                                                            column
                                                                                .id
                                                                        ] ||
                                                                        "#3b82f6", // Warna default biru
                                                                }}
                                                            >
                                                                {column.name}
                                                                <button
                                                                    className="float-end text-gray-100 hover:text-gray-400"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation(); // Prevent opening the modal
                                                                        openDeleteModal(
                                                                            `Delete Card: ${column.name}`
                                                                        );
                                                                        // deleteTask(columnId, task.id);
                                                                    }}
                                                                >
                                                                    <FaRegTrashAlt className="my-1 w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    className="float-end text-gray-100 hover:text-gray-400 me-2"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        openColorModal(
                                                                            column.id
                                                                            //    awalnya data.name tapi modalnya ga bisa di buka
                                                                        );
                                                                    }}
                                                                >
                                                                    <FaPen className="my-1 w-5 h-5" />
                                                                </button>
                                                            </div>

                                                            <Droppable
                                                                droppableId={
                                                                    column.name
                                                                }
                                                                type="TASK"
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        {...provided.droppableProps}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        className="min-h-0 p-2 border rounded"
                                                                    >
                                                                        {tasks.map(
                                                                            (
                                                                                task,
                                                                                index
                                                                            ) => (
                                                                                <Draggable
                                                                                    key={
                                                                                        task.id
                                                                                    }
                                                                                    draggableId={String(
                                                                                        task.id
                                                                                    )}
                                                                                    index={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {(
                                                                                        provided
                                                                                    ) => (
                                                                                        <div
                                                                                            ref={
                                                                                                provided.innerRef
                                                                                            }
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            className="relative bg-gray-50 p-3 rounded shadow mb-3 cursor-pointer"
                                                                                            onClick={() =>
                                                                                                openTaskModal(
                                                                                                    task
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <div className="flex justify-between">
                                                                                                <span>
                                                                                                    {
                                                                                                        task.name
                                                                                                    }
                                                                                                </span>
                                                                                                {renderPriorityIcon(
                                                                                                    task.priority
                                                                                                )}
                                                                                            </div>
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
                                        }
                                    )}
                                    {provided.placeholder}

                                    {/* Form to Add Board */}
                                    <div className="flex justify-center p-1">
                                        <form
                                            autoComplete="off"
                                            onSubmit={handleAddBoard}
                                        >
                                            <input
                                                maxLength="20"
                                                className="truncate bg-white placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-1 focus:ring-indigo-500"
                                                type="text"
                                                name="newCol"
                                                placeholder="Add a new Board"
                                                value={newBoardName}
                                                onChange={(e) =>
                                                    setNewBoardName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <button
                        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-3xl"
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >
                        +
                    </button>

                    {/* Modals */}
                    <TaskModal
                        isOpen={isTaskModalOpen}
                        onClose={closeTaskModal}
                        task={selectedTask}
                    />

                    <AddTaskModal
                        isOpen={isAddTaskModalOpen}
                        onClose={() => setIsAddTaskModalOpen(false)}
                        boards={boards}
                    />

                    <AddMemberModal
                        isOpen={isAddMemberModalOpen}
                        onClose={() => setIsAddMemberModalOpen(false)}
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
        </ErrorBoundary>
    );
}

export default Board;
