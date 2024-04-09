import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'; // Importa el idioma español

const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0; // 0 significa domingo
    };

    const isValidDate = (date) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 30); // Suma 30 días
        return date >= new Date() && date <= currentDate && isWeekday(date);
    };

    return (
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={isValidDate}
        placeholderText="Selecciona una fecha"
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        locale={es} // Configura el idioma español
        dateFormat="dd/MM/yyyy"
        weekStartsOn={1} // Empieza la semana en lunes
        />
    );
};

export default CustomDatePicker;
