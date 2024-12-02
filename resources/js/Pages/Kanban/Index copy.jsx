// App.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialColumns = {
    backlog: {
        name: "Backlog",
        tasks: [
            { id: "1", content: "Welcome to Agilix 🙌" },
            { id: "2", content: "skfkdsq" },
        ],
    },
    waiting: {
        name: "Waiting",
        tasks: [
            { id: "3", content: "You can add detailed Descriptions." },
            {
                id: "4",
                content: "Breakdown big tasks into small actionable steps.",
            },
            { id: "5", content: "kmkmkmk" },
        ],
    },
};

function Index() {
    const [columns, setColumns] = useState(initialColumns);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Do nothing if an item is dropped outside any column
        if (!destination) return;

        // Reordering tasks within the same column
        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedTasks = [...column.tasks];
            const [removed] = copiedTasks.splice(source.index, 1);
            copiedTasks.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedTasks,
                },
            });
        } else {
            // Moving tasks between columns
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceTasks = [...sourceColumn.tasks];
            const destTasks = [...destColumn.tasks];
            const [removed] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceTasks,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destTasks,
                },
            });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-700">
                    Boards / Main Board
                </h1>
                <div className="mt-2 flex items-center space-x-2">
                    <span className="text-gray-600">Show Priority:</span>
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                        High
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                        Medium
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                        Low
                    </button>
                </div>
            </div>

            {/* Columns */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-white rounded shadow p-4"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-blue-600">
                                            {column.name}
                                        </h2>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            🗑️
                                        </button>
                                    </div>
                                    <div>
                                        {column.tasks.map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-gray-50 p-3 rounded shadow mb-3"
                                                    >
                                                        {task.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                +
            </button>
        </div>
    );
}

export default Index;
