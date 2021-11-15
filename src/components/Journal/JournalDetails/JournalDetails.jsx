import { useSelector } from "react-redux";
import { useState } from 'react';

function JournalDetails() {

    const journalEntry = useSelector(store => store.journal.setSelectedEntry)
    const [isEmpty, setIsEmpty] = useState(true);
    console.log(journalEntry.name);

    // if (journalEntry.name !== 'empty' || undefined) {
    //     setIsEmpty(false);
    // }

    console.log(isEmpty);

    return (<>
        <h1>JOURNAL DETAILS</h1>

        {(journalEntry.name === 'empty')
            ?
                <>
                    <p>NO SELECTED ENTRY</p>
                </>
            :
            <>
                {JSON.stringify(journalEntry)}
            </>
            }
    </>)
}

export default JournalDetails;