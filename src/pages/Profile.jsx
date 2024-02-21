import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import profileImage from "../Assets/profile.png";
import myProfile from "../Assets/myProfile.png";
import myTrips from "../Assets/busTrips.png";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer"
import { useNavigate } from "react-router-dom";
import "../components/CSS/userProfile.css";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({})
  const [history, sethistory] = useState(false)
  const [bookings, setbookings] = useState([])
  const [buses, setbuses] = useState([])
  const getDetails = async()=>{
    const response = await fetch('http://localhost:4000/userdetails',{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
    })
    const json = await response.json();
   setuser(json.user)
  }
  const getTrips = async()=>{
    const response = await fetch('http://localhost:4000/history',{
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    })
    const data = await response.json();
    setbookings(data.tickets)
    data.tickets.forEach(async booking=>{
      const bus = await getBusDetails(booking.bus)
      setbuses([...buses,bus])
    })
  }
  useEffect(()=>{
    getDetails()
    getTrips()
  },[])
  const handleEditInProfile = (e) => {
    e.preventDefault();
    navigate("/profile/editUserProfile");
  };
  const getBusDetails = async(id)=>{
  const response = await fetch("http://localhost:4000/busdetails",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({id})
  })
  const json = await response.json();
  return json.bus
 } 
  return (
    <>
      <Navbar />
    <div className="profile">
      <div className="leftdiv">
        <div style={{ marginBottom: "4rem" }} className="profile-items">
          <img className="profile-icons" src={profileImage} alt="profile" />
          <h2>{user.firstName + " " + user.lastName}</h2>
        </div>
        <div className="profile-items">
          <img className="profile-icons" src={myProfile} alt="MyProfile" />
          <button id="profile" onClick={()=>{sethistory(false)}} style={{background:"inherit"}}><h2>My profile</h2></button>
        </div>
        <hr />
        <div className="profile-items">
          <img className="profile-icons" src={myTrips} alt="trips" />
          <button id="history" onClick={()=>{sethistory(true)}} style={{background:"inherit"}}><h2>My trips</h2></button>
        </div> 
        <hr />
      </div>

      <div className="rightdiv">
        <h1>My Profile</h1>
{ !history && <div className="profile-details">
          <div className="nameAndGender">
            <div>
              <h2>Name</h2>
              <h3>{user.firstName + " " + user.lastName}</h3>
            </div>
            <div>
              <h2>Gender</h2>
              <h3>Male</h3>
            </div>
          <div className="dob">
            <h2>Date of Birth</h2>
            <h3>27-08-2003</h3>
          </div>
        </div>
          <div className="contact-info">
            <hr />
            <h1>My Contact Information</h1>

            <div className="nameAndGender">
              <div>
                <h2>Email</h2>
                <h3>{user.email}</h3>
              </div>
              <div>
                <h2>Mobile Number</h2>
                <h3>{user.mobile}</h3>
              </div>
            </div>

            <button type="submit" onClick={handleEditInProfile}>
              Edit Info{" "}
            </button>
          </div>
        </div>}
        {history && <div className="profile-details">
        <table className="table" style={{fontSize:'20px',padding:'10px'}}>
          <thead >
            <tr >
            <th scope="col">Bus</th>
            <th scope="col">cost</th>
            <th scope="col">seats</th>
            <th scope="col">fare</th>
            <th scope="col">DOJ</th>
            </tr>
          </thead>
          
          <tbody>
            {bookings.map((booking,index)=>{
            return <tr>
                <td><img src="bus1.png" alt=""  style={{height:'60px'}}/></td>
                <td>{buses[index].tktprice}</td>
                <td>{booking.tickets.length}</td>
                <td>{booking.tickets.length * buses[index].tktprice}</td>
                <td>{booking.date}</td>
              </tr> 
            })}
            </tbody>
        </table>
        
      </div>}
      </div>
    </div>
  
    <Footer/>
    </>
  );
};

export default Profile;
