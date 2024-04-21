import React, { useContext, useState } from 'react'
import { adddata } from './context/Contextprovider.js';

export default function Register() {

  const {udata, setudata} = useContext(adddata);

  const [inputval, setINP] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: ''
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({
      ...preval,
      [name]: value
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, work, add, mobile, desc, age } = inputval;

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, work, add, mobile, desc, age
        })
      });

      if (!res.ok) {
        throw new Error('Failed to add data');
      }

      const data = await res.json();
      console.log(data);
      setudata(data);
      alert("Data added successfully");
    } catch (error) {
      console.log(error);
      alert("Error adding data");
    }
  };

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

            <button type="submit" class="btn btn-primary" onClick={addinpdata}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
