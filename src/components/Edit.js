import React, { useEffect, useState } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import {Modal,ModalHeader,ModalBody,Row,Col, ModalFooter} from 'reactstrap';
import '../App.css';
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
//import {Button} from 'react-bootstrap';

const Edit=({id,count})=>{
    
    const[modal,setModal]=useState(false);
    //const[todos,setTodos]=useState(null);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[draft,setDraft]=useState(false);
    // const [date,setDate]=useState();
    // const [time,setTime]=useState();
    const [currentColor,setCurrentColor]=useState('');
    const [value, setValue] = useState(new Date());
    // const {id}=useParams();


    // const handleClose = () => setModal(false); const handleShow = () => setModal(true);
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        
      const data= {title,description,draft,currentColor,value};
        fetch("http://localhost:8000/todos/"+id,{
           method:"PUT",
           headers:{"content-type":"application/json"},
           body: JSON.stringify(data)
        }).then((res)=>{
               alert('Updated Succesfully'); 
               window.location.reload();
        
        }).catch((err)=>{
            console.log(err.message);
        })
        setModal(false);
       
    
    }
    useEffect(()=>{
        fetch("http://localhost:8000/todos/"+id).then((res)=>{
            return res.json();
        }).then((resp)=>{
                  setTitle(resp.title);
                  setDescription(resp.description);
                  setDraft(resp.draft);
                  setCurrentColor(resp.currentColor);
                //   setTime(resp.time);
                //   setDate(resp.date);
                  setValue(value);

        }).catch((err)=>{
            console.log(err.message);
        })
     },[]);

     const Deleteitem=(id)=>
    {
         if(window.confirm('Do you want to delete')){
            fetch("http://localhost:8000/todos/"+id,{
           method:"DELETE",
        }).then((res)=>{
               alert('Deleted Succesfully'); 
                window.location.reload();
        
        }).catch((err)=>{
            console.log(err.message);
        })
       
         }
    }
    function boxcolor(value){
        let v=value;
       setCurrentColor(v);
       
    }
    const changeDraft=()=>{
        let value=draft;
        (value===false)?
           setDraft(true):setDraft(false);

        
    }
    return(

        <div>
        
       {/* {(count===0)?null:setModal(true)} */}
        
       <button className="but--edit"  type="submit" onDoubleClick={()=>setModal(true)}><i className="fa fa-edit"></i></button> 
       { <Modal size="500px"    
        isOpen={modal}
        toggle={()=>setModal(!modal)}> 
            <ModalHeader  toggle={()=>setModal(!modal)}>
           
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Edit Todo
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
                            <input value={date} onChange={e=>setDate(e.target.value)}type="date" className='form-control'/><br/><br/>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div>
                            <input value={time} onChange={e=>setTime(e.target.value)}type="time" required className='form-control'/><br/><br/>
                            </div>
                        </Col> */}
                        {/* <Col lg={24}>
                            <div>
                            <input checked={draft} onChange={e=>setDraft(e.target.checked)}type="checkbox" className='form-check-input'/>
                            <label className="form-check-label" >Is Draft</label>
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
                   
                    </Row>
                    <button className='color-butto1' type='button' id='buto' value={'#ADD8E6'}  onClick={()=>boxcolor('#ADD8E6')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-butto2' type='button' id='buto' value={'#CBC3E3'} onClick={()=>boxcolor('#CBC3E3')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-butto3' type='button' id='buto' value={'#FED8B1'} onClick={()=>boxcolor('#FED8B1')} ></button> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className='color-butto4' type='button' id='buto' value={'yellow'} onClick={()=>boxcolor('yellow')}></button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='color-butto5' type='button' id='buto' value={'aqua'} onClick={()=>boxcolor('aqua')}></button> &nbsp;&nbsp;&nbsp;&nbsp;  
                    
                    <ModalFooter>
                    <button className="but" class="btn btn-success" type="submit">Update</button>
                    <button className="but--draft" class="btn btn-light" onClick={changeDraft} type="submit">Save as Draft</button> 
                    <button className='but--del'  type="submit" class="btn btn-danger" onClick={()=>Deleteitem(id)}>Delete</button>
                    
                    </ModalFooter>
                </form>
                
            </ModalBody>
        </Modal>}
        {/* <button className="btn-mt-3" onClick={()=>setModal(true)}><i class="fa fa-plus"></i>Edit Todo</button> */}
        
   

          
            
           

        
       </div>

    )
}
export default Edit;