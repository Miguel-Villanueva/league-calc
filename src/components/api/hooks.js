import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {championsURL, dataURL} from './constants'

//Transforms champion data
export function useChampionList() {
    const [champions, setChampions] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); 

    useEffect( () => {
        const fetchChampList = async () => {
            await Axios.get(championsURL)
            .then((res) => {
                setChampions(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false)
            });

        }
        fetchChampList();
    }, []);

    return {champions, error, loading};
}

export function useChampStats(champID) {
    const champDataURL = dataURL(champID);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); 
    const [stats, setStats] = useState([]);

    useEffect( () => {
        const fetchChampData = async () => {
            await Axios.get(champDataURL)
            .then((res) => {
                setStats(res.data.data[champID].stats)
                
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false)
            });

        }
        fetchChampData();
    }, [champDataURL]);

    return {stats, error, loading};
}



