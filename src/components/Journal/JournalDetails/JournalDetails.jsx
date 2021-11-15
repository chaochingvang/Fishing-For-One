import { useSelector } from "react-redux";
import { format } from 'date-fns';
import { useHistory } from "react-router";


function JournalDetails() {

    const history = useHistory();
    const journalEntry = useSelector(store => store.journal.setSelectedEntry)

    console.log(journalEntry.name);


    return (<>
        <h1>JOURNAL DETAILS</h1>

        {(journalEntry.name === 'empty')
            ?
                <>
                    <p>NO SELECTED ENTRY</p>
                </>
            :
            <>
                <button onClick={() => history.push('/journal')}>Back to Journal</button>

                <img src={journalEntry.image_url} />
                <h2>{journalEntry.fishName}</h2>
                <h2>Caught with: {journalEntry.lureName}</h2>
                <h2>Caught on: {format(new Date(journalEntry.date), 'MM-dd-yyyy')}</h2>
                <h2>Length: {journalEntry.length}</h2>
                <h2>Weight: {journalEntry.weight} </h2>
                <h2>Additional Comments: {journalEntry.comments} </h2>
            </>
            }
    </>)
}

export default JournalDetails;