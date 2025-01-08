import React, { useEffect, useState } from "react"

export default function BusStopMenu({onUploadStop, onCreateBusStop, busStopMarker, onSetBusStopMarker}) {
    const [latInput, setLatInput] = useState();
    const [lngInput, setLngInput] = useState();
    const [nameInput, setNameInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [isRequest, setIsRequest] = useState(false);
    const [stopIdInput, setStopIdInput] = useState();

    const busStopCoords = {latitude: latInput, longitude: lngInput}
    const busStopRequest = {
        name: nameInput,
        stopId: stopIdInput,
        city: cityInput,
        coordinate: busStopCoords,
        isRequest: isRequest
    }

    const handleChangeLat = event => {
        setLatInput(event.target.value)
    }

    const handleChangeLng = event => {
        setLngInput(event.target.value)
    }

    const handleChangeName = event => {
        setNameInput(event.target.value)
    }

    const handleChangeCity = event => {
        setCityInput(event.target.value)
    }

    const handleChangeRequestStop = event => {
        setIsRequest(event.target.checked)
    }

    const handleChangeStopId = event => {
        setStopIdInput(event.target.value)
    }
 
    const handleSubmit = event => { 
        event.preventDefault()
        onUploadStop(busStopRequest)
    }

    useEffect(() => {
        if(busStopMarker){
            setLatInput(busStopMarker.lat);
            setLngInput(busStopMarker.lng);
        }
    },[busStopMarker])

    useEffect(() => {
        if(latInput && lngInput){
            onSetBusStopMarker(latInput, lngInput)
        }
    },[latInput, lngInput])

    useEffect(() => {
        onCreateBusStop()
    },[])

    return (
        <>
        <form>
            <input type='number' step="0.000001" placeholder='Szerokość geograficzna' value={latInput} onChange={handleChangeLat}/>
            <input type='number' step="0.000001" placeholder='Długość geograficzna' value={lngInput} onChange={handleChangeLng}/>
            <input type='text' placeholder="Nazwa Przystanku" value={nameInput} onChange={handleChangeName} />
            <input type='text' placeholder="Miasto" value={cityInput} onChange={handleChangeCity} />
            <div>
                <input type='checkbox' id='request' value={isRequest} onChange={handleChangeRequestStop} />
                <label for='request'>Is Request?</label> 
            </div>
            <input type='number' placeholder='Stop Id' value={stopIdInput} onChange={handleChangeStopId}/>
            <button onClick={handleSubmit}>Dodaj Przystanek</button>
        </form>
        </>
    )
}