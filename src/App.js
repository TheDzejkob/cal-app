import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";


//nenašel jsem v dokumentaci čr tak jsem použil default US 
//použité knihovny: react-datepicker a react-big-calendar
// při tvoření použit ChatGPT pro neco malo a také GitHubCopilot

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: null, end: null });
  const [allEvents, setAllEvents] = useState(events);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
        const d1 = new Date(allEvents[i].start);
        const d2 = new Date(newEvent.start);
        const d3 = new Date(allEvents[i].end);
        const d4 = new Date(newEvent.end);

        if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
            alert("Alert se zde již nachází!");
            break;
        }
    }


    handleRemoveEvent();

    setAllEvents([...allEvents, newEvent]);
}

function handleRemoveEvent() {
    if (selectedEventIndex !== null) {
        const updatedEvents = [...allEvents];
        updatedEvents.splice(selectedEventIndex, 1);
        setAllEvents(updatedEvents);
        setSelectedEventIndex(null);
    }
}

    return (
        <div className="App">
            <h1>Kalendář</h1>
            <h2>Přidat event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Přidat event
                </button>
                <button style={{ marginTop: "10px" }} onClick={handleRemoveEvent}>
                Odebrat event
                </button>
            </div>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 480, margin: "40px" }}
                onSelectEvent={(event, e) => {
                    const selectedEventIndex = allEvents.findIndex((ev) => ev === event);
                    setSelectedEventIndex(selectedEventIndex);
                }}
            />
        </div>
    );
}

export default App;