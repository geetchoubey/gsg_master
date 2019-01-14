import React from "react";

const MenuList = (props) => {
    const menus = props.data.menus.map(v => {
        if(v.link){
            return (
                <li key={v.name}><a href={v.link}>{v.name}</a></li>
            )
        }
        else{
            return (
                <li key={v.name}>{v.name}</li>
            )
        }
        
    })
    return(
        <React.Fragment>
            <h5>{props.data.heading}</h5>
            <ul className="nostyle-list">
                {menus}
            </ul>
        </React.Fragment>
        
    )
}

export default MenuList;