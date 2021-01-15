import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {navigate} from 'gatsby'
import {Form, Input} from 'antd';
import Layout from "../components/layout"
import SEO from "../components/seo"
import {useChampionList} from "../components/api/hooks"
import {searchChamp} from "../components/utils"

const {Search} = Input;

function Dashboard (){
    const response = useChampionList();
    const champions = response.champions;
  
    const [validChamp, setValidChamp] = useState(true);
    
    const goToCalc = (value) => {
        const champID = searchChamp(value, champions);
        (champID ? navigate("/calculator", {state: {id: champID}}) : setValidChamp(false));
    }

    if(response.loading){
        return(<div>loading</div>);
    }
    if(response.error){
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
                            onSearch={value => goToCalc(value)}
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