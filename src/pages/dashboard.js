import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {navigate} from 'gatsby'
import {Form, Input} from 'antd';
import Layout from "../components/layout"
import SEO from "../components/seo"
import {useChampionList} from "../components/api/hooks"

const {Search} = Input;

function Dashboard (){
    const response = useChampionList();
    const champions = response.champions;
    const [loading, setLoading] = useState(response.loading);
    const [error, setError] = useState(response.setError);  
    const [validChamp, setValidChamp] = useState(true);
    
    const searchChamp = (value) => {
        for(const champ in champions){
            if(value.toLowerCase() === champions[champ].name.toLowerCase() || 
                value.toLowerCase() === champions[champ].id.toLowerCase()){
                    navigate("/calculator", 
                         {
                            state: {
                                id: champions[champ].id}
                            }
                    )
                }
        }
        setValidChamp(false);
    }

    if(!loading){
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
                            enterButton="Search"
                        />
                    </Form.Item>
                 
                </Form>

                {!validChamp && <p>please enter a valid champion</p>}
            </Layout>
        </div>
    );
};

export default Dashboard;