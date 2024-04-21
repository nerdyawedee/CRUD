import React, { useContext, useEffect, useState } from 'react'
import {   useNavigate, useParams } from 'react-router-dom'
import { updatedata } from './context/Contextprovider';


export default function Edit() {
  const {updata, setupdata} =useContext(updatedata);
  const history =  useNavigate("");

  const [inputval, setINP] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: ''
  })
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  
  const { id } = useParams("");
  // console.log(id);
  const getdata = async () => {
    try {
      const res = await fetch(`http://localhost:8000/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setINP(data);
    } catch (error) {
      console.error(error);
      // Handle error state or display error message to the user
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  const updateuser =async(e)=>{
    e.preventDefault();
    const {name,email,work,add,mobile,desc,age} = inputval;
    const res2 = await fetch(`http://localhost:8000/update/${id}`,{
      method: "PATCH",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify({
        name,email,work,add,mobile,desc,age
        })
    });
    const data2 = await res2.json();
    console.log(data2);
    if(res2.status === 422 || !data2){
      alert("fill the data");
    }
    else{
      alert("data added");
      history("/home");
      setupdata(data2);
    }
  }
  
  return (
    <>
      <div className='container'>
        <form className='mt-5'>
          <div className='row'>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="email" name='name' value={inputval.name} onChange={setdata} class="form-control" aria-describedby="emailHelp" />

            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Email</label>
              <input type="email" name='email' value={inputval.email} onChange={setdata} class="form-control" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Age</label>
              <input type="text" name='age' value={inputval.age} onChange={setdata} class="form-control" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Mobile</label>
              <input type="number" name='mobile' value={inputval.mobile} onChange={setdata} class="form-control" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Work</label>
              <input type="text" name='work' value={inputval.work} onChange={setdata} class="form-control" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Address</label>
              <input type="text" name='add' value={inputval.add} onChange={setdata} class="form-control" />
            </div>
            <div class="mb-3 col-lg-12 col-md-12 col-12">
              <label for="exampleInputPassword1" class="form-label">Description</label>
              <textarea name="desc" value={inputval.desc} onChange={setdata}  className="form-control" id="" cols="30" rows="5" />
            </div>

            <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
