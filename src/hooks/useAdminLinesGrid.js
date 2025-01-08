import { useContext } from 'react';

import CreatorContext from '../context/creator';


export function useAdminLinesGrid() {

    const {onChunkedLines} = useContext(CreatorContext);


    const chunkLines = (lines) => {
        const result = [];
        for (let i = 0; i < lines.length; i += 5) {
            result.push(lines.slice(i, i + 5));
        }
        onChunkedLines(result);
    };

    return {chunkLines};
}