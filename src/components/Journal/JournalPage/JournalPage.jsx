import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";


function JournalPage() {
    const history = useHistory();

    return (<>


        <button onClick={() => history.push('/journal/form') }>Add A New Entry</button>

        <JournalList />

        
    </>)
}
export default JournalPage;