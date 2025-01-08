import { createSlice } from "@reduxjs/toolkit";
import { fill, initial } from "lodash";

const lineCreatorFormSlice = createSlice({
    name: 'lineCreatorForm',
    initialState: {
    lineName: "",
    validFrom: "",
    route: "",
    selectedBusStop: null,
    timeToTravelInMinutes: 0,
    routeStops: [
    ],
    weekDaysDepartureTimes: [],
    saturdaysDepartureTimes: [],
    sundaysAndHolidaysDepartureTimes: [],
    canHandDraw: false,
    routeLinePoints: [],
    operator: 'Kłosok Sp z o.o. S.k Tel. 570 323 199',
    organizer: 'ZPGSA, ul. Piastowska 19a, Tel: 74 832 87 78',
    },
    
    reducers: {
        changeLineName: (state, action) => {
            state.lineName = action.payload;
        },
        changeValidFromDate: (state, action) => {
            state.validFrom = action.payload;
        },
        changeRoute: (state, action) => {
            state.route = action.payload;
        },
        changeSelectedBusStop: (state, action) => {
            state.selectedBusStop = action.payload;
        },
        changeTimeToTravel: (state, action) => {
            state.timeToTravelInMinutes = action.payload;
        },
        addRouteStop: (state, action) => {
            state.routeStops.push(action.payload);
        },
        removeRouteStop: (state, action) => {
            const updated = state.routeStops.filter((stop) => 
                stop.order !== action.payload)
            if (updated.length > 1) {
                const sortedAndUpdated = updated.sort((a, b) => a.order - b.order);
                sortedAndUpdated.forEach((stop, index) => {
                    stop.order = index + 1;
                });
                const firstStop = sortedAndUpdated[0];
                if (firstStop) {
                    firstStop.timeToTravelInMinutes = 0;
                } 
                state.routeStops = sortedAndUpdated
            } else if (updated.length < 2) {
                state.routeStops = [];
                if (updated.length === 1) {
                state.routeStops.push({order: 1, name: updated[0].name, busStopId: updated[0].busStopId, timeToTravelInMinutes: 0, coordinate: updated[0].coordinate});
            }
            } else {
                state.routeStops = [];
            }
            
        },
        addWeekDayDepartureTime: (state, action) => {
            state.weekDaysDepartureTimes.push(action.payload);
        },
        removeWeekDayDepartureTime: (state, action) => {
            state.weekDaysDepartureTimes = state.weekDaysDepartureTimes.filter((time) => time.time !== action.payload.time)
        },
        addSaturdaysDepartureTime: (state, action) => {
            state.saturdaysDepartureTimes.push(action.payload);
        },
        removeSaturdaysDepartureTime: (state, action) => {
            state.saturdaysDepartureTimes = state.saturdaysDepartureTimes.filter((time) => time.time !== action.payload.time);
        },
        addSundaysAndHolidaysDepartureTime: (state, action) => {
            state.sundaysAndHolidaysDepartureTimes.push(action.payload);
        },
        removeSundaysAndHolidaysDepartureTime: (state, action) => {
            state.sundaysAndHolidaysDepartureTimes = state.sundaysAndHolidaysDepartureTimes.filter((time) => time.time !== action.payload.time)
        },
        changeCanHandDraw: (state, action) => {
            state.canHandDraw = !state.canHandDraw;
        },
        addRouteLinePoint: (state, action) => {
            state.routeLinePoints.push(action.payload);
        },
        removeRouteLinePoint: (state, action) => {
            const updated = state.routeLinePoints.filter((point) => 
                point.order !== action.payload)
            const sortedAndUpdated = updated.sort((a, b) => a.order - b.order);
            sortedAndUpdated.forEach((point, index) => {
                point.order = index + 1;
            });
            const firstPoint = sortedAndUpdated[0];
            state.routeLinePoints = sortedAndUpdated
        },
        changeOperator: (state, action) => {
            state.operator = action.payload;
        },
        changeOrganizer: (state, action) => {
            state.organizer = action.payload;
        },
        resetAllForm: (state, action) => {
            state.lineName = '';
            state.validFrom = '',
            state.route = '';
            state.selectedBusStop = null;
            state.timeToTravelInMinutes = 0;
            state.routeStops = [];
            state.weekDaysDepartureTimes = [];
            state.saturdaysDepartureTimes = [];
            state.sundaysAndHolidaysDepartureTimes = [];
            state.canHandDraw = false;
            state.routeLinePoints = [];
            state.operator = 'PPUH Kłosok Tel. 570 323 199';
            state.organizer = 'ZKM Bielawa, ul. Piastowska 1, Tel: 74 832 87 77';
        },
        fillForm: (state, action) => {
            state.lineName = action.payload.lineName;
            state.validFrom = action.payload.validFrom;
            state.route = action.payload.route;
            state.routeStops = action.payload.routeStops;
            state.timeToTravelInMinutes = action.payload.timeToTravelInMinutes;
            state.weekDaysDepartureTimes = action.payload.weekDaysDepartureTimes;
            state.saturdaysDepartureTimes = action.payload.saturdaysDepartureTimes;
            state.sundaysAndHolidaysDepartureTimes = action.payload.sundaysAndHolidaysDepartureTimes;
            state.canHandDraw = action.payload.canHandDraw;
            state.routeLinePoints = action.payload.routeLinePoints;
        }
    }
});

export const { 
    changeLineName, 
    changeValidFromDate,
    changeRoute, 
    changeSelectedBusStop,
    changeTimeToTravel,
    addRouteStop, 
    removeRouteStop,
    addWeekDayDepartureTime,
    removeWeekDayDepartureTime,
    addSaturdaysDepartureTime,
    removeSaturdaysDepartureTime,
    addSundaysAndHolidaysDepartureTime,
    removeSundaysAndHolidaysDepartureTime,
    changeCanHandDraw,
    addRouteLinePoint,
    removeRouteLinePoint,
    changeOperator, changeOrganizer,
    resetAllForm, fillForm } = lineCreatorFormSlice.actions;
export const lineCreatorFormReducer = lineCreatorFormSlice.reducer;
