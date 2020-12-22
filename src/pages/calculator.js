import React, { useEffect, useState } from 'react';
import {Image} from 'antd'
import Axios from 'axios';
import {useChampStats} from '../components/api/hooks'
import {Form, InputNumber, Row, Col} from 'antd'
import FormItem from 'antd/lib/form/FormItem';


const Calculator = ({location}) => {
    const champID = location.state.id;
    const splashURL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champID + '_0.jpg';
    
    const champStats = useChampStats(location.state.id);
    const loading = champStats.loading;
    const error = champStats.error;
    
    const [level, setLevel] = useState(1);

    const [health, setHealth] = useState();
    const [attackDamage, setAttackDamage] = useState();
    const [abilityPower, setAbilityPower] = useState();
    const [armor, setArmor] = useState();
    const [magicResist, setMagicResist] = useState();
    const [attackSpeed, setAttackSpeed] = useState();
    const [critChance, setCritChance] = useState();
    const [moveSpeed, setMoveSpeed] = useState();


    useEffect( () => {
        setHealth(champStats.stats.hp);
        setAttackDamage(champStats.stats.attackdamage);
        setAbilityPower(0);
        setArmor(champStats.stats.armor);
        setMagicResist(champStats.stats.spellblock);
        setAttackSpeed(champStats.stats.attackspeed);
        setMoveSpeed(champStats.stats.movespeed);
        setCritChance(champStats.stats.crit)    
    }, [champStats.stats]);
    

    //Stat = Stat - (StatPerLevel * level) + (StatPerLevel * value) 
    function handleLevel(value){
        setHealth(health - (level * champStats.stats.hpperlevel ) + (value * champStats.stats.hpperlevel));
        setAttackDamage(attackDamage - (level * champStats.stats.attackdamageperlevel) + (value * champStats.stats.attackdamageperlevel));
        setArmor(armor - (level * champStats.stats.armorperlevel) + (value * champStats.stats.armorperlevel));
        setMagicResist(magicResist - (level * champStats.stats.spellblockperlevel) + (value * champStats.stats.spellblockperlevel));
        setAttackSpeed(attackSpeed - (level * champStats.stats.attackspeedperlevel) + (value * champStats.stats.attackspeedperlevel));
        setCritChance(critChance - (level * champStats.stats.critperlevel) + (value* champStats.stats.critperlevel));

        setLevel(value);
    }

    if(loading){
        return(<div>loading</div>);
    }
    if(error){
        return(<div>error</div>)
    }
    return (
        <div>
            <h1>Champion: {champID}</h1>
            <Row>
                <Col>
                    <img src= {splashURL}/>
                </Col>
            </Row>
            
            
            <Row >
                <Col >
                    <h2>Level</h2>
                    <InputNumber min={1} max={18} defaultValue={1} onChange={handleLevel}/>
                </Col>
                <Col>
                    <h2>Stats</h2>
                    <ul>
                        <li key="HP">HP: {health}</li>
                        <li key="AD">AD: {attackDamage}</li>
                        <li key="AP">AP: {abilityPower}</li>
                        <li key="AR">AR: {armor}</li>
                        <li key="MR">MR: {magicResist}</li>
                        <li key="AS">AS: {attackSpeed}</li>
                        <li key="Crit">Crit: {critChance}</li>
                        <li key="MS">MS: {moveSpeed}</li>
   
                    </ul>
                </Col>
            </Row>
            

        
        </div>
    );
};



export default Calculator;