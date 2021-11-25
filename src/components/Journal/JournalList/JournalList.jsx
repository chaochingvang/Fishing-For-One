import { useSelector } from "react-redux";

import JournalItem from '../JournalItem/JournalItem';
import ImageList from '@mui/material/ImageList';

import './JournalList.css';

function JournalList() {

    const journalList = useSelector(store => store.journal.journalList);

    console.log(`this is journalList`, journalList);

    return (<>
        <h1>Journal List!</h1>

        <div className="journals">
            <ImageList sx={{ width: '95%'}} cols={2} rowHeight='auto'>

                {journalList?.map(journalEntry => (
                    <JournalItem
                        key={journalEntry.id}
                        journalEntry={journalEntry}
                    />
                ))}
            </ImageList>

        </div>
    </>)
}

export default JournalList;