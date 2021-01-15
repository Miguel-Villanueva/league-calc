import React, { useEffect, useState } from 'react';
import {calcLevelStats} from '../components/utils'
import {useChampStats} from '../components/api/hooks'
import {Form, Input, InputNumber, Row, Col, Button} from 'antd'
import {splashURL, itemsURL, itemPNG} from '../components/api/constants'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ReactHtmlParser from 'react-html-parser'

var _ = require('lodash');
const {Search} = Input;
const queryClient = new QueryClient();

const Calculator = ({location}) => {
    const champID = location.state.id;
    const splash = splashURL(champID);
    
    const baseStats = useChampStats(location.state.id);

    const [stats, setStats] = useState(
        {
            level: 1,
            health: 0,
            attackDamage: 0,
            abilityPower: 0,
            armor: 0,
            magicResist: 0,
            attackSpeed: 0,
            critChance: 0,
            moveSpeed: 0
        }
    );
    
    const [itemCounter, setItemCounter] = useState(0);

    const [itemStats, setItemStats] = useState(
        {
            FlatHPPoolMod: 0,
            PercentHPPoolMod: 0,

            FlatPhysicalDamageMod: 0,
            PercentPhysicalDamageMod: 0,

            FlatMagicDamageMod: 0,
            PercentMagicDamageMod: 0,


            FlatArmorMod: 0,
            PercentArmorMod: 0,

            FlatSpellBlockMod: 0,
            PercentSpellBlockMod: 0,

            FlatAttackSpeedMod: 0,
            PercentAttackSpeedMod: 0,
            
            FlatCritChanceMod: 0,
            PercentCritChanceMod: 0,

            FlatMovementSpeedMod: 0,
            PercentMovementSpeedMod: 0
        }
    );
    
    //Create array of stat names
    const itemStatNames = _.keysIn(itemStats);
    const [itemPics, setItemPics] = useState("");

    useEffect( () => {
        setStats({
            health: baseStats.stats.hp,
            attackDamage: baseStats.stats.attackdamage,
            abilityPower: 0,
            armor: baseStats.stats.armor,
            magicResist: baseStats.stats.spellblock,
            attackSpeed: baseStats.stats.attackspeed,
            moveSpeed: baseStats.stats.movespeed,
            critChance: baseStats.stats.crit
        })
        
    }, [baseStats.stats]);
    
    function handleLevel(value){
        setStats(calcLevelStats(value, baseStats.stats));
        console.log(stats)
    }
    function handleItemPic(id){
        setItemPics(itemPics.concat("<img src=" + itemPNG(id) + " />"))
        console.log(itemPics)
    }
    //TODO: HANDLE REGEX FOR SLIGHTLY MISSPELLED ITEM NAMES
    function handleItem(value, data){
        const itemID = _.findKey(data, function(item){
            return (item.name.toLowerCase() === value.toLowerCase()) 
        });
        if(itemCounter >= 6){
            console.log("max items")
        }
        else if(itemID){
            console.log(data[itemID].stats);
            setItemCounter(itemCounter + 1);
            handleItemPic(itemID);

            _.keys(data[itemID].stats).map((stat) => {
                if(_.has(itemStats, stat)){
                    //Given a variable equivalent to a key in an JSON object, how can you use useState to change that JSON object key
                    setItemStats({...itemStats, [stat]: itemStats[stat] + data[itemID].stats[stat]})
                }
            })

            console.log(itemStats);
           
        }   
        else{
            console.log("item not found")
        }
        
        //setStats({...stats, health: stats.health + data.data[itemID].stats.FlatHPPoolMod})
    }
    
    function ReactQueryTest(){
        const {isLoading, error, data} = useQuery('itemData', () => 
            fetch(itemsURL).then(res => res.json())
        )
        if(isLoading) return <div>NOT LOADED</div>
        if(error) return <div>ERROR</div>
        console.log("REACHED HERE")
        return (<div><Form>
                Please Input Items
                <Form.Item>
                    <Search
                        onSearch={value=>handleItem(value, data.data)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                            htmlType="submit">
                                Submit
                    </Button>
                </Form.Item>
            </Form>
            {ReactHtmlParser(itemPics)}
            </div>)
    }

    if(baseStats.loading){
        return(<div>loading</div>);
    }
    if(baseStats.error){
        return(<div>error</div>)
    }
    return (
        <div>
            <h1>Champion: {champID}</h1>
            <Row>
                <Col>
                    <img src= {splash}/>
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
                        <li key="HP">HP: {stats.health}</li>
                        <li key="AD">AD: {stats.attackDamage}</li>
                        <li key="AP">AP: {stats.abilityPower}</li>
                        <li key="AR">AR: {stats.armor}</li>
                        <li key="MR">MR: {stats.magicResist}</li>
                        <li key="AS">AS: {stats.attackSpeed}</li>
                        <li key="Crit">Crit: {stats.critChance}</li>
                        <li key="MS">MS: {stats.moveSpeed}</li>
   
                    </ul>
                </Col>
            </Row>
            <Row>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryTest/>
                </QueryClientProvider>
            </Row>

        
        </div>
    );
};

export default Calculator;