import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {championsURL, dataURL} from './constants'


//Transforms champion data
export function useChampionList() {
    const [champions, setChampions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); 

    useEffect( () => {
        const fetchChampList = async () => {
            try{
                const res = await Axios.get(championsURL);
                setChampions(res.data.data);
            } catch(e) {
                setError(true);
            } finally {
                setLoading(false);
            }
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
            try{
                const res = await Axios.get(champDataURL);
                setStats(res.data.data[champID].stats)
            } catch(e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchChampData();
    }, [champDataURL]);

    return {stats, error, loading};
}



