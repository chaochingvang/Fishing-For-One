import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import JournalItem from '../JournalItem/JournalItem';

function JournalList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: `FETCH_JOURNAL` });
    }, [])

    const journalList = useSelector(store => store.journal.setJournal);

    console.log(`this is journal`, journalList);

    return (<>
        <h1>Journal List!</h1>

        {JSON.stringify(journalList)}

        {journalList?.map(journal => (
            <JournalItem
                key={journal.id}
                journal={journal}
            />
        ))}
    </>)
}

export default JournalList;