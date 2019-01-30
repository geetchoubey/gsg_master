import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BannerForm = (props) => {
    return(
        <div className="form-wrapper">
            <input name="name" placeholder="Name" type="text"/>
            <DatePicker
                selected={props.eventDate}
                onChange={props.changeHandler}
                placeholderText="Click to select a date"
                dateFormat="MMMM d, yyyy"
            />
            <input name="name" placeholder="Name" type="text"/>
            <button className="submit">Book now</button>
        </div>
    )
}

export default BannerForm;