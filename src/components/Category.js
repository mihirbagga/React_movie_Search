import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Avtar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {postDataAndImage } from './FetchServices'

const useStyles = makeStyles(theme => ({
        
    maincontainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      backgroundColor:'#3f729b',
    },    
    heading:
    {height:'auto',
     padding:10,
     backgroundColor:'#f5f6fa',
     margin:2,
      borderTopLeftRadius:100,
      borderTopRightRadius:100,
      borderBottomLeftRadius:100,
      borderBottomRightRadius:100,
      marginBottom:15
    },
    large:
    {
        
        height:theme.spacing(12),
        width:theme.spacing(12),
        marginTop:7,
    },
    mainpaper: {
        width:window.innerWidth*0.5, 
        height:'auto', 
        marginTop:5,
        backgroundColor:'#FFDC80',
         
        },
    
      }));
export default function Category()
{ const classes= useStyles();

  const[getCategory,setCategory]=useState('')
  const[getIcon,setIcon]=useState({icon:'',file:''})
  const [getMessage,setMessage]=useState('')
  const handleSubmit=async()=>{
    // let body={categoryname:getCategory,icon:getIcon}
    // console.log(body)
    var formData=new FormData()
    formData.append('categoryname',getCategory) 
    formData.append('icon',getIcon.file) 
    var config={headers:{'content-type':'multipart/form-data'}}
    var result= await postDataAndImage('category/addnewcategory',formData,config)
    
    if(result.result)
    { //alert("Record Submitted")
     setMessage('Record Submitted')
    }
    else{
   // alert('Fail to Submit Record')
    setMessage('Fail to Submit Record')
    }
   } 
    return(
        <div className={classes.maincontainer}>
        <Paper className={classes.mainpaper}>
            <Paper  className={classes.heading}> 
                <div style={{fontSize:24,fontWeight:'Bold'}}>Category Registration</div>
                <div style={{fontSize:14,fontWeight:'Bold'}}>(Add Category)</div>
            </Paper>
            <Grid container spacing={3} style={{padding:20}}>
                <Grid xs={12}>
                    <TextField  fullWidth id="categoryname"
       label="Category Name"variant='outlined'
       onChange={(event)=>setCategory(event.target.value)}/>
                </Grid>
                <Grid xs={12} sm={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Avtar alt="Remy Sharp" src={getIcon.icon} className={classes.large} />
                </Grid>
                <Grid xs={12} sm={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <input
              accept="image/*"
              
              id="c"
              multiple
              type="file"
              style={{display:'none'}}
              onChange={(event)=>setIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
              
            />
            <label htmlFor="c">
              <Button variant="contained" color="primary" component="span" >
                Upload
              </Button>
            </label>
                </Grid>
                <Grid item xs={12} sm={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
              Submit
            </Button>
      </Grid>
      <Grid item xs={12} sm={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Button variant="contained" color="primary">
              Reset
            </Button>
      </Grid>
      {getMessage}
      </Grid>

        </Paper>
        </div>
    )
}