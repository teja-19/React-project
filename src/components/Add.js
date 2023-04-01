import React,{useEffect, useState} from 'react';
import {Modal,ModalHeader,ModalBody,Row,Col, ModalFooter} from 'reactstrap';
//import "bootstrap/dist/css/bootstrap.min.css";
//import ReactDOM from 'react-dom/client';
import '../App.css';
import Edit from './Edit';
import moment from 'moment';
import axios from 'axios';
import {Switch} from 'antd';
import DateTimePicker from 'react-datetime-picker';
import { MDBIcon} from 'mdbreact';

//import moment from 'moment'; 
//import DatePicker from 'react-date-picker';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import { fixControlledValue } from 'antd/es/input/Input';

function Add(){
    const[val,setVal]=useState('');
    const[modal,setModal]=useState(false);
    const[todos,setTodos]=useState(null);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[draft,setDraft]=useState(false);
    const [togg,setTogg]=useState(false);
    // const [date,setDate]=useState('');
    // const [time,setTime]=useState('');
    const [openEditPage, setOpenEditPage] = useState();
    //let colors=['green','orange','blue','lemonchiffon','purple'];
    const [currentColor,setCurrentColor]=useState('');
    const [value, setValue] = useState(new Date());

    // const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
   
  
  
  

     //var day;
    // let name = months[value.getMonth()];
    // var string = day + ' ' + name;
    // var hours=value.getHours();
    // var minutes=value.getMinutes();
    // var ampm = hours >= 12 ? 'PM' : 'AM';
    // var string2 = hours + ':' + minutes + ' ' + ampm;
    // const clock=string+','+string2;
    
    
    const handleSubmit=(e)=>
    {
       
        e.preventDefault();
       
        console.log(draft);
      const data= {title,description,draft,currentColor,value};
        fetch("http://localhost:8000/todos",{
           method:"POST",
           headers:{"content-type":"application/json"},
           body: JSON.stringify(data)
        }).then((res)=>{
              
               window.location.reload();      
        
        }).catch((err)=>{
            console.log(err.message);
        })
        setModal(false);
       
    
    }
    
    const changeDraft=()=>{
        let value=draft;
        (value===false)?
           setDraft(true):setDraft(false);

        
    }
   
    const editpage = id => setOpenEditPage(id);

    // const updateState=()=>
    // {
    // const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    // var day=value.getDate();
    // let name = months[value.getMonth()];
    // var string = day + ' ' + name;
    // var hours=value.getHours();
    // var minutes=value.getMinutes();
    // var ampm = hours >= 12 ? 'PM' : 'AM';
    // var string2 = hours + ':' + minutes + ' ' + ampm;
    // const clock=string+','+string2;
    // setValue(clock);
    // console.log(value);

    // }
   //console.log(count);
    // useEffect(()=>{
    //     const loadData=async()=>{
    //         setLoad(true);
    //         const response=await axios.get('http://localhost:8000/todos');
    //         setPosts(response.data);
    //         setLoad(false);
    //     }
    //     loadData();

    // },[]);
    // const handleSearch=async(e)=>{
    //     e.preventDefault();
    //     return await axios.get(`http://localhost:8000/todos?q=${val}`)
    //     .then((response)=>{
    //         setTodos(response.data);
    //         setVal("");
    //     }).catch((err)=>console.log(err));
    // }
    // const handleReset=()=>{
    //     loadUserData();
    // }
    const loadUserData=async()=>{
             return await axios.get("http://localhost:8000/todos")
             .then((response)=>setTodos(response.data))
             .catch((err)=>console.log(err));
    };
    useEffect(()=>{
        loadUserData();
    },[]);
    // const colortem=(id,value)=>
    // {
    //     let v=value;
        
    //     fetch("http://localhost:8000/todos/"+id,{
    //        method:"PUT",
    //     }).then((res)=>{
    //             setCurrentColor(v);
    //             document.getElementById('color').style.backgroundColor(v);
    //             window.location.reload();
        
    //     }).catch((err)=>{
    //         console.log(err.message);
    //     })
       
         
    //}
    const handleFilter=async(val)=>
    {   
        togg?setTogg(false):setTogg(true);
        if(togg)
        {
          loadUserData();
    }
    else{
        return await axios.get(`http://localhost:8000/todos?draft=${val}`)
        .then((response)=>{
            setTodos(response.data);
        }).catch((err)=>console.log(err));
    }

    }
 

    
    
    useEffect(()=>{
        fetch("http://localhost:8000/todos").then((res)=>{
               return res.json();
        }).then((resp)=>{
          setTodos(resp);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])
    // const handleonChange=(color)=>{
    //     setCurrentColor(color.hex)
    //  }

     function boxcolor(value){
         let v=value;
        setCurrentColor(v);
        
     }

 
   
  
    
   // const borderBtn = document.querySelector('.div2');
   

    return(
      
       <div>
        <form style={{
            margin:'auto',
            padding:"15px",
            maxWidth:"380px",
            alignContent:"center",
           right:'385px',
            
         }}
         className="d-flex input-group w auto">
         
        <input type="text" className="form-control" placeholder="Search" value={val} onChange={(e)=>setVal(e.target.value)}/>
         </form>
        <Modal size="500px"
        isOpen={modal}
        toggle={()=>setModal(!modal)}>
            <ModalHeader  toggle={()=>setModal(!modal)} style={{color:'white'}}>
           
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Add/Edit Todo
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={24}>
                            <div>
                            <input value={title} onChange={e=>setTitle(e.target.value)} className='form-control' type="text" required placeholder="title"/><br/>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div>
                            <textarea value={description} onChange={e=>setDescription(e.target.value)} className='form-control' placeholder= "description" required/><br/>
                            </div>
                        </Col>
                        {/* <Col lg={24}>
                            <div>
                            <input value={date} onChange={e=>setDate(e.target.value)}type="date" required className='form-control'/><br/><br/>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div>
                            <input value={time} onChange={e=>setTime(e.target.value)}type="time" required className='form-control'/><br/><br/>
                            </div>
                        </Col> */}
                        <Col>
                        <DateTimePicker
                                onChange={(value)=>setValue(value)}
                                value={value}
                                Format={moment(value).format('d MMM,h:mm A')}
                                utcOffset={0}
                                selected={value}
                                />
                               
                        </Col>       
                                     
                                     
                              
                    
                        
                        {/* <Col lg={24}>
                            <div style={{borderWidth:'200'}}>
                            <input checked={draft} onChange={e=>setDraft(e.target.checked)}type="checkbox" className='form-check-input'/>
                            <label className="form-check-label" >Is Draft</label>
                            </div>
                        </Col> */}
                      
                    {/* <input type="color" value="bisque" ></input> */}
                    
                    </Row>
                    <br/>
                    <button className='color-button1' type='button' id='buto' value={'#ADD8E6'}   onChange={e=>setCurrentColor(e.target.value)} onClick={()=>boxcolor('#ADD8E6')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-button2' type='button' id='buto' value={'#CBC3E3'}  onChange={e=>setCurrentColor(e.target.value)} onClick={()=>boxcolor('#CBC3E3')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-button3' type='button' id='buto' value={'#FED8B1'}  onChange={e=>setCurrentColor(e.target.value)} onClick={()=>boxcolor('#FED8B1')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-button4' type='button' id='buto' value={'yellow'}  onChange={e=>setCurrentColor(e.target.value)} onClick={()=>boxcolor('yellow')}></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-button5' type='button' id='buto' value={'aqua'}  onChange={e=>setCurrentColor(e.target.value)} onClick={()=>boxcolor('aqua')}></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    
                    <ModalFooter>
                    <button className="but--draft" class="btn btn-light" onClick={changeDraft}type="submit">Save as Draft</button> 
                    <button className="but" class="btn btn-success"  onClick={()=>handleSubmit()}type="submit">Save</button>
                   
                    </ModalFooter>
                </form>
                
                {/* <button className='color-button1'onClick={boxcolor} ></button> &nbsp;&nbsp;&nbsp;&nbsp; */}
               
              
            </ModalBody>
        </Modal>
        
        
        
        <button onClick={()=>setModal(true)} style={{fontSize:16}}>
        <i class="fa fa-plus"></i>Add Todo</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Switch onClick={()=>handleFilter(true)} style={{position:'right'}}/>
        <label><b>Drafts</b></label>
        <br/><br/>
        <div className='Para'>
            {   todos &&
                todos.filter((item)=>item.title.toLowerCase().includes(val)).map(item=>(
                     <div id='color' className='div2' key={item.id} style={{width: 340,
                        border: '5px solid white',textIndent: -30,paddingRight:32,paddingLeft:40,whiteSpace:'pre',
                        paddingTop:15, backgroundColor:item.currentColor
                        }} onClick={()=>{editpage(item.id)}} >
                     
                    
                    <input type="checkbox" className='form-check-input'/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <label><b>{item.title}</b></label>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                     { (item.draft===true)?<label style={{border:'0.5px solid black',position:'right',borderRadius:25,textAlign:'center',paddingLeft:40,paddingRight:8,backgroundColor:'#F5F5F5'}}>
                     <b>Draft</b></label>:null}
                     <br/><p><span style={{fontSize:14,wordWrap:'break-word',whiteSpace:'normal',marginLeft: '.5rem',textAlignLast:"left"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.description}</span>
                     <br/></p>
                  
                     {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBIcon style={{paddingLeft:25,paddingTop:30}}far icon="clock" /><span style={{fontSize:12,paddingLeft:-30}}>{item.date},</span>
                     <span style={{fontSize:12}}> {item.time}</span></p>
                     {console.log(value)} */}
                     {/* <p><span style={{fontSize:12}}>{item.value}</span></p> */}
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MDBIcon style={{paddingLeft:25,paddingTop:30}}far icon="clock" /><span style={{fontSize:12}}>{moment(item.value).format('D MMM h:mm, A')}</span></p>
                                          
                     {openEditPage === item.id ? <Edit id={item.id} count={true}></Edit> : null}
                     {/* <button  class="btn btn-success" type="submit"><i className="fa fa-edit"></i></button>&nbsp;&nbsp; */}
                     {/* <Edit id={item.id} className='editable'/> */}
                     
                    
                     {/* <button className='but--del'  type="submit" onClick={()=>Deleteitem(item.id)}><i className="fa fa-trash"></i></button> */}
                     {/* <p>{item.description}</p> */}
                     

                    </div>
                ))
            }
        </div>

          
            
           

        
       </div>

    )

}

export default Add;