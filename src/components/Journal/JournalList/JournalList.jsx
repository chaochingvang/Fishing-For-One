import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

function JournalList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: `FETCH_JOURNAL` });
    }, [])

    const journalList = useSelector(store => store.journal.setJournal);

    console.log(`this is journalList`, journalList);

    return (<>
        <h1>Journal List!</h1>

        <div className="journals">
        {journalList?.map(journalEntry => (
            <JournalItem
                key={journalEntry.id}
                journalEntry={journalEntry}
            />
        ))}
        </div>
    </>)
}

export default JournalList;