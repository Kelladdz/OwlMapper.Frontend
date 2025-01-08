import React, { useEffect, useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom"
import { useFetchVariantsQuery } from "../../../store/apis/variantsApi";


export default function VariantMenu() {
    const params = useParams();
    const lineName = params.lineName;
    const variants = useFetchVariantsQuery(lineName)?.data || [];

    return (
        <div>
            <h1>Wybierz trasę:</h1>
            <ul>
                {variants.map((variant, index) => {
                    return <li key={index}><Link to={`/user/lines/${params.lineName}/variants/${variant.variant.slug}`}>{variant.variant.route}</Link></li>
                })}
            </ul>
            <div style={{marginTop: `2rem`}}>
                    <Link to='/user'>Wróć</Link>
                </div>
        </div>
    )
}