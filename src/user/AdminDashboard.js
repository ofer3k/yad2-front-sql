import React, { useState, useEffect} from "react";
import { isAuthenticated, signout } from "../auth";
import { Link } from "react-router-dom";
import NavBarPersonal from './../core/small-components/PrivateArea'
import { useHistory } from "react-router-dom";
import { listProductsByUser } from "../core/apiCore";
import PersonalAreaProduct from "../core/PersonalAreaProduct";

const AdminDashboard = () => {
  let history = useHistory();
  
  const [products,setProducts]=useState([])
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    useEffect(() => {
        listProductsByUser(_id).then(
            data=>{setProducts(data)
            console.log(data)}
        )
        // console.log(_id);
      }, []) 

    return (
        <>
        <NavBarPersonal/>
        <div className={'name_logOut'}>
           <span className={'logout_personal_info'} onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }>התנתק</span>
            <span>{name} שלום</span>
        </div>
        <p className={'personal_info_my_producys'}>
            <span>איזור אישי - המודעות שלי</span>
        </p>
        <div className={'my_posts_container'} >
        <p  className={'my_posts_container__header'}>כל המודעות</p>
        {products.map((a)=>
        <PersonalAreaProduct product={a} />)}
        </div>
        </>
    );
};

export default AdminDashboard;
