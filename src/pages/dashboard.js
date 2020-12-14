import Axios from 'axios';
import React, {useState, useEffect} from 'react';

import {Form, Input} from 'antd';
import Layout from "../components/layout"
import SEO from "../components/seo"

const {Search} = Input;

const Dashboard = () => {
    const [champions, setChampions] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [validChamp, setValidChamp] = useState(true);

    const getChampions = async() => {
        const champURL = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json';
        await Axios.get(champURL)
            .then((res) =>{
                setChampions(res.data.data);     
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getChampions();
    }, []);
    
    const searchChamp = (value) => {
        for(const champ in champions){
            if(value.toLowerCase() === champions[champ].name.toLowerCase() || 
                value.toLowerCase() === champions[champ].id.toLowerCase()){
                    console.log('champ id: ', champions[champ].id)
                    return champions[champ].id
                }
        }
        setValidChamp(false);
    }

    
    if(loading){
        return(<div>loading</div>);
    }
    if(error){
        return(<div>error</div>)
    }
    return (
        <div>
            <Layout>
                <SEO title="Dashboard" />
                <h1>Choose Your Champion!</h1>
                
                <p>Welcome to my League of Legends damage calculator. Choose your champion and items to see how much your abilities do.</p>

                <Form>
                    <Form.Item >
                        <Search
                            id="searchChamp"
                            placeholder="Search Champion"
                            onSearch={value => searchChamp(value)}
                            onChange= {() => setValidChamp(true)}
                            enterButton
                        />
                    </Form.Item>
                </Form>

                {!validChamp && <p>please enter a valid champion</p>}
            </Layout>
        </div>
    );
};

export default Dashboard;