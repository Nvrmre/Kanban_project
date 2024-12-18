import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProjectShow from "./ProjectShow"; // Impor komponen ProjectShow
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Komponen Index (untuk board)
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
            { id: "4", content: "Breakdown big tasks into small actionable steps." },
            { id: "5", content: "kmkmkmk" },
        ],
    },
};

function Index() {
    const [columns, setColumns] = useState(initialColumns);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedTasks = [...column.tasks];
            const [removed] = copiedTasks.splice(source.index, 1);
            copiedTasks.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...column, tasks: copiedTasks },
            });
        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceTasks = [...sourceColumn.tasks];
            const destTasks = [...destColumn.tasks];
            const [removed] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
                [destination.droppableId]: { ...destColumn, tasks: destTasks },
            });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
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
                                    <h2 className="text-lg font-semibold text-blue-600">{column.name}</h2>
                                    {column.tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
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
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

// Aplikasi utama dengan routing
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/project/:id" component={ProjectShow} />
                <Route exact path="/" component={Index} />
            </Switch>
        </Router>
    );
}

export default App;
