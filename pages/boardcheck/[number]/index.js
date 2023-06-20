// import React from 'react';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Board from '../../../src/components/Board/index';
import axios from "axios";
import { useRouter } from "next/router";


export default function Check() {
    const {query} = useRouter();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [id, setId] = useState();
    

    


    const getBoard = async () => {
        const abcd = await (await axios.get(`http://127.0.0.1:8000/blog/blog/${id}`)).data;
        setBoard(abcd);
        setLoading(false);
        console.log(abcd)
    };

    useEffect(() => { 
        if (query?.number) {       
            setId(query?.number || 0)
        }
    }, [query]);

    useEffect(() => {
        if (id) {
            getBoard();
        }
    }, [id])
    // ({ title, user, body, image }) 
    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <Board
                    id = {id}
                    title = {board.title}
                    user = {board.user}
                    body = {board.body}
                    image = {board.image}

                    />
            )}
            
        </div>
    );
}
