import React from 'react';
import classnames from 'classnames';
import * as calendarFunction from './calendarFunction';
import './index.css';

export default class DatePicker extends React.Component {
    static defaultProps = {
        date: new Date(),
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    PrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);
        
        this.setState({ date });
    };

    NextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);
        
        this.setState({ date });
    };

    SelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;

        const date = new Date(year, month);

        this.setState({ date });
    };

    DayClick = date => {
        this.setState({ selectedDate: date });
        
        this.props.onChange(date);
    };

    render() {
        const { years, monthNames, weekDayNames } = this.props;
        const { currentDate, selectedDate } = this.state;

        const monthData = calendarFunction.getMonthData(this.year, this.month);

        return (
            <div className="calendar">
                <header>
                    <button onClick={this.PrevMonthButtonClick}>{'←'}</button>

                    <select
                        ref={element => this.monthSelect = element}
                        value={this.month}
                        onChange={this.SelectChange}
                    >
                        {monthNames.map((name, index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>

                    <select
                        ref={element => this.yearSelect = element}
                        value={this.year}
                        onChange={this.SelectChange}
                    >
                        {years.map(year =>
                            <option key={year} value={year}>{year}</option> 
                        )}
                    </select>

                    <button onClick={this.NextMonthButtonClick}>{'→'}</button>
                </header>

                <table>
                    <thead>
                        <tr>
                            {weekDayNames.map(name =>
                                <th key={name}>{name}</th>    
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {monthData.map((week, index) =>
                            <tr key={index} className="week">
                                {week.map((date, index) => date ?
                                    <td
                                        key={index}
                                        className={classnames('day', {
                                            'today': calendarFunction.areEqual(date, currentDate),
                                            'selected': calendarFunction.areEqual(date, selectedDate)
                                        })}
                                        onClick={() => this.DayClick(date)}
                                    >{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                )}
                            </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}