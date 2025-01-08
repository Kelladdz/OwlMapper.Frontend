// import Link from "../../Link";
import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';

export default function Start() {
    useEffect(() => {
        localStorage.removeItem('schedules');
        localStorage.removeItem('currentStop');
    })
    return (
        <div>
            <div>
                <Link to='/user'>Użytkownik</Link>
            </div>
            <div>
                <Link to='/admin'>Admin</Link>
            </div>
        </div>
    );
}