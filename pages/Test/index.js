// import Check from '../../src/components/contents/[number]/index'
import { useParams } from "react-router-dom"

export default function TestFolders() {
    // return <Check />
    const { id } = useParams();
    console.log(useParams());

    return (
        
    )
}