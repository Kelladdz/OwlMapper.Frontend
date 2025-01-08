import { ACTION_COMPLETE_LABELS } from '../../constants/actionCompleteLabels';

import './action-complete.css';

export default function ActionComplete({action}) {

    return (
        <div className='action-info-box'>
            <span className='action-info-label'>{ACTION_COMPLETE_LABELS[action]}</span>
        </div>
    )
}