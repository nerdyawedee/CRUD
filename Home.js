import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { adddata } from './context/Contextprovider';
import { updatedata } from './context/Contextprovider';

export default function Home() {
    const [getuserdata, setuserdata] = useState([]);
    const { udata, setudata } = useContext(adddata);
    const {updata, setupdata} =useContext(updatedata);

    const getinpdata = async () => {
        try {
            const res = await fetch("http://localhost:8000/getdata", {
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
            console.log(error);
            // Handle error state or display error message to the user
        }
    };

    useEffect(() => {
        getinpdata();
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
            getinpdata();
        }
    }
    return (
        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Success!</strong> user added successfully.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    </> : " "
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Success!</strong> user updated successfully.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    </> : " "
            }


            <div className='mt-5'>
                <div className='container'>
                    <div className='add_btn mt-2 mb-2'>
                        <Link to="/register" className='btn btn-primary'>Add data</Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">ID</th>
                                <th scope="col">USERNAME</th>
                                <th scope="col">AGE</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">JOB</th>
                                <th scope="col">NUMBER</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(getuserdata) && getuserdata.map((element, id) => (
                                <tr key={element._id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.age}</td>
                                    <td>{element.email}</td>
                                    <td>{element.work}</td>
                                    <td>{element.mobile}</td>
                                    <td className='d-flex justify-content-between'>
                                        <Link to={`/detail/${element._id}`}><button className='btn btn-success'><RedEyeIcon /></button></Link>
                                        <Link to={`/edit/${element._id}`}><button className='btn btn-primary'><EditIcon /></button></Link>
                                        <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
