import React, {Component} from "react"
import { Link } from "gatsby"
import Axios from "axios"
import {Form, Input} from 'antd';

import Layout from "../components/layout"
import SEO from "../components/seo"

const {Search} = Input;

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            champions: [],
            loaded: false,
            validChamp: true
        }
    }
    
    componentDidMount(){
        this.getChampions()
    }

    getChampions = async() => {
        await Axios.get(`http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json`)
            .then((res) =>{
                    for(const champ in res.data.data){
                        this.setState({
                            champions: [...this.state.champions, {name:`${res.data.data[champ].name}`, id:`${res.data.data[champ].id}`}]
                        })
                    }
                }
            )
        .catch( (err) => 
            console.log(err)
        )
        this.setState({loaded: true})
        console.log(this.state.champions)
    }

    searchChamp = (value) => {
        const {champions} = this.state;
        console.log(value)

        for(const champ in champions){
            if(value.toLowerCase() === `${champions[champ].name}`.toLowerCase() || value.toLowerCase() === `${champions[champ].id}`.toLowerCase()){

                return `${champions[champ].id}`
            }
        }

        this.setState({
            validChamp: false
        })

    }

    render(){
        return(
            <Layout>
                <SEO title="Dashboard" />
                <h1>Choose Your Champion!</h1>
                
                <p>Welcome to my League of Legends damage calculator. Choose your champion and items to see how much your abilities do.</p>

                <Form onFinish={this.onFinish}>
                    <Form.Item >
                        <Search
                            id="searchChamp"
                            placeholder="Search Champion"
                            onSearch={value => this.searchChamp(value)}
                            onChange= {() => this.setState({validChamp: true})}
                            enterButton
                        />
                    </Form.Item>
                </Form>

                {!this.state.validChamp && <p>please enter a valid champion</p>}
            </Layout>
        )
    }
        
}   
export default Dashboard
