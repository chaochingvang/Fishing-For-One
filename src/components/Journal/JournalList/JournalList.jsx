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

    console.log(`this is journal`, journalList);

    return (<>
        <h1>Journal List!</h1>

        <div className="journals">
        {journalList?.map(journal => (
            <JournalItem
                key={journal.id}
                journal={journal}
            />
        ))}
        </div>
    </>)
}

export default JournalList;