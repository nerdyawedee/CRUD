import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import profile from './profile.png';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams, Link ,useNavigate} from 'react-router-dom';

export default function Detail() {
    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);
    const { id } = useParams("");
    console.log(id);
    const history = useNavigate();
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
            setuserdata(data);
        } catch (error) {
            console.error(error);
            // Handle error state or display error message to the user
        }
    };
    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        }
        else {
            console.log("user deleted");
            history("/home");
        }
    }

    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className='add_btn'>
                        <Link to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><EditIcon /></button></Link>
                        <button onClick={() => deleteuser(getuserdata._id)} className='btn btn-danger'><DeleteIcon /></button>
                    </div>
                    <div className="row">
                        <div className='left_view col-lg-6 col-md-6 col-12'>
                            <img src={profile} style={{ width: 50 }} alt="Profile" />
                            <h3 className="mt-3">Name: <span>{getuserdata.name}</span></h3>
                            <h4 className="mt-3">Age: <span>{getuserdata.age}</span></h4>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{getuserdata.work}</span></p>
                        </div>
                        <div className='right_view col-lg-6 col-md-6 col-12'>
                            <p className='mt-5'><PhoneAndroidIcon />Mobile: <span>{getuserdata.mobile}</span></p>
                            <p className='mt-3'><LocationOnIcon />Location: <span>{getuserdata.add}</span></p>
                            <p className='mt-3'>Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
