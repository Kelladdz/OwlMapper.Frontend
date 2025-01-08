import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import CreatorContext from '../context/creator';

export function useDepartureTable(scheduleDay) {

    const variantsWithLetters = useSelector(state => {return state.scheduleCreator.variantsWithLetters});

    const {weekDaysDepartures, saturdaysDepartures, sundaysAndHolidaysDepartures, onChunckedWeekDaysDepartureTimesChange, onChunckedSaturdaysDepartureTimesChange, onChunckedSundaysAndHolidaysDepartureTimesChange, chunckedWeekDaysDepartureTimes, chunckedSaturdaysDepartureTimes, chunckedSundaysAndHolidaysDepartureTimes} = useContext(CreatorContext);
    let lastVariantWithLetter;

    if (variantsWithLetters.length > 0) {
        lastVariantWithLetter = variantsWithLetters[variantsWithLetters.length - 1];
    }


  
    const chunkAppropriateDepartureTimes = (departureTimes) => {
        console.log('Departure Times to chunk: ', departureTimes)
        const timesDisplay = departureTimes.map(time => `${time.time}${time.symbol}${time.isOnlyInSchoolDays ? 'S' : ''}${time.isOnlyInDaysWithoutSchool ? 'W' : ''}`);
        const result = [];
        for (let i = 0; i < timesDisplay.length; i += 9) {
            result.push(timesDisplay.slice(i, i + 9));
        }
        return result;
    };

    const sortTimes = (times) => {
        if (Array.isArray(times[0])) {
            times = times.flat();
        }
        console.log('Times to sort: ', times)
        const sortedTimes = times.sort((a, b) => {
            const [aHours, aMinutes] = [parseInt(a.time.split(':')[0], 10), parseInt(a.time.split(':')[1], 10)];
            const [bHours, bMinutes] = [parseInt(b.time.split(':')[0], 10), parseInt(b.time.split(':')[1], 10)];
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
        });
        console.log('Sorted Times: ', sortedTimes)
        return sortedTimes;
    };    
    
    useEffect(() => {
        console.log('Week Days Departures: ', weekDaysDepartures)
        let timesWithSymbols, sortedDepartureTimes;
        switch(scheduleDay) {
            case 0:
                if (weekDaysDepartures.length > 0 && variantsWithLetters.length > 0) {
                    console.log('Departure Times extracted from appropriate departures: ', weekDaysDepartures)
                    timesWithSymbols = [];    
                    weekDaysDepartures.forEach(departure => {
                        if(variantsWithLetters.some(variant => variant.variantId === departure.variantId)){
                            let symbol = variantsWithLetters.find(variant => variant.variantId === departure.variantId).symbol;
                            symbol = symbol === '1' ? '' : symbol;
                            timesWithSymbols.push({...departure, symbol: symbol})
                        }
                    })
                    console.log(timesWithSymbols)
                    sortedDepartureTimes = sortTimes(timesWithSymbols);
                    onChunckedWeekDaysDepartureTimesChange(chunkAppropriateDepartureTimes(sortedDepartureTimes));
                }               
                break;
            case 1:
                if (saturdaysDepartures.length > 0 && variantsWithLetters.length > 0) {
                    console.log('Departure Times extracted from appropriate departures: ', saturdaysDepartures)
                    timesWithSymbols = [];
                    saturdaysDepartures.forEach(departure => {
                        if(variantsWithLetters.some(variant => variant.variantId === departure.variantId)){
                            let symbol = variantsWithLetters.find(variant => variant.variantId === departure.variantId).symbol;
                            symbol = symbol === '1' ? '' : symbol;
                            timesWithSymbols.push({...departure, symbol: symbol})
                        }
                    })
                    sortedDepartureTimes = sortTimes(timesWithSymbols);
                    onChunckedSaturdaysDepartureTimesChange(chunkAppropriateDepartureTimes(sortedDepartureTimes));
                }
                break;
            case 2:
                if (sundaysAndHolidaysDepartures.length > 0 && variantsWithLetters.length > 0) {
                    console.log('Departure Times extracted from appropriate departures: ', sundaysAndHolidaysDepartures)
                    timesWithSymbols = [];
                    sundaysAndHolidaysDepartures.forEach(departure => {
                        if(variantsWithLetters.some(variant => variant.variantId === departure.variantId)){
                            let symbol = variantsWithLetters.find(variant => variant.variantId === departure.variantId).symbol;
                            symbol = symbol === '1' ? '' : symbol;
                            timesWithSymbols.push({...departure, symbol: symbol})
                        }
                    })
                    console.log(timesWithSymbols)
                    sortedDepartureTimes = sortTimes(timesWithSymbols);
                    onChunckedSundaysAndHolidaysDepartureTimesChange(chunkAppropriateDepartureTimes(sortedDepartureTimes));
                }
                break;
            default:
                break;
            }
        
        
    }, [variantsWithLetters, weekDaysDepartures, saturdaysDepartures, sundaysAndHolidaysDepartures]);



    return {chunckedWeekDaysDepartureTimes, chunckedSaturdaysDepartureTimes, chunckedSundaysAndHolidaysDepartureTimes};
}