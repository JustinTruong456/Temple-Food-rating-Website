"use strict";

const AjaxFoodRatings = () => {

    console.log("AjaxFoodRating running");

    // Common React pattern. Display a "...Loading..." UI while the page
    // is loading. Don't try to render the component until this is false.  
    const [isLoading, setIsLoading] = React.useState(true);

    // this is the data initially read (just once) from the DB.
    const [dbList, setDbList] = React.useState([]);

    // if there is an ajax error (or db connection error, set this state variable)
    const [error, setError] = React.useState(null);

    // the user's input that filters the list. 
    const [filterInput, setFilterInput] = React.useState("");

    // this is the filtered list.
    const [filteredList, setFilteredList] = React.useState([]);

    // useEffect 2nd parameter is an array of elements that 
    // (if any of those state variables change) should trigger the function specified 
    // as the 1st useEffect parameter. 
    // RUN ONCE PATTERN: If you put [] as 2nd param, it runs the 1st param (fn) once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(

            "foodrating/getAll", // URL for AJAX call to invoke

            // success function (anonymous)
            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    console.log("in AjaxFoodRating, here is foodratng list (on the next line):");
                    console.log(dbList.foodRatingList);
                    jsSort(dbList.foodRatingList, "webUseremail", "text");
                    setDbList(dbList.foodRatingList);
                    setFilteredList(dbList.foodRatingList);
                }
                setIsLoading(false); // set isLoading last to prevent premature rendering. 
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                setError(msg);
                setIsLoading(false); // set isLoading last to prevent premature rendering.
            }
        );
    },
        []);


    const doFilter = (filterInputVal) => {
        let newList = filterObjList(dbList, filterInputVal);
        console.log("function doFilter. filterInputVal is: " + filterInputVal +
            ". See filtered list on next line:");
        console.log(newList);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    }

    function sortByProp(propName, sortType) {
        // sort the user list based on property name and type
        jsSort(filteredList, propName, sortType);
        console.log("Sorted list is below");
        console.log(filteredList);

        // For state variables that are objects or arrays, you have to do 
        // something like this or else React does not think that the state 
        // variable (dbList) has changed. Therefore, React will not re-render 
        // the component.
        let listCopy = JSON.parse(JSON.stringify(filteredList));
        setFilteredList(listCopy);
    }

    function deleteListEle(theList, indx) {

        // This javascript "built in function" removes 1 element (2nd param),
        // starting from position indx (1st param)
        theList.splice(indx, 1);

        // You have to make React aware that the list has actually changed 
        // or else it won't re-render. Converting to JSON and back does the trick. 
        return JSON.parse(JSON.stringify(theList));
    }

    // invoke a web API passing in userId to say which record you want to delete. 
    // but also remove the row (of the clicked upon icon) from the HTML table -- 
    // if Web API sucessful... 
    function deleteUser(userObj, indx) {

        console.log("To delete foodrating of " + userObj.foodRatingDescription + " for " + userObj.foodRatingname + "?");

        if (confirm("Do you really want to delete the foodrating of " + userObj.foodRatingDescription + " for " + userObj.foodRatingname +  "? ")) {


            // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
            ajax_alt(

                "foodrating/delete?foodRatingId=" + userObj.foodRatingId, // URL for AJAX call to invoke

                // success function (anonymous)
                function (obj) {   // success function gets obj from ajax_alt
                    console.log("successful ajax call");
                    if (obj.errorMsg.length > 0) {
                        console.log("DB error trying to delete the foodRating record");
                        //setError(obj.errorMsg);
                        alert(`Error: ${obj.errorMsg}`);   
                        console.log(`Error: ${obj.errorMsg}`);
                    } else {
                        console.log("got the web user foodRating to delete");
                        console.log(obj);
                        setDbList(deleteListEle(dbList, indx));
                        setFilteredList(deleteListEle(filteredList, indx));
                        alert("Delete Works");
                    }
                    setIsLoading(false); // set isLoading last to prevent premature rendering. 
                },

                // failure function (also anonymous)
                // failure function gets error message from ajax_alt
                function (msg) { 
                    alert(`Error: ${msg}`);   
                    console.log(`Error: ${msg}`);  
                    //setError(msg);
                    setIsLoading(false); // set isLoading last to prevent premature rendering.
                }
            );


        }
    } // deleteUser


    function callInsert() {
        window.location.hash = "#/registerFoodRating";
    }

    if (isLoading) {
        console.log("Is Loading...");
        return <div> Loading... </div>
    }

    if (error) {
        console.log("Error...");
        return <div>Error: {error} </div>;
    }

    console.log("items for FoodTable on next line");
    return (
        <div className="clickSort">
            <h3>
                Food Rating list &nbsp;
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
                &nbsp;
                <img src="icons/insert.png" onClick={callInsert} />
            </h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th onClick={() => sortByProp("webUseremail", "text")} >
                            <img src="icons/sortUpDown16.png" />Email
                        </th>

                        <th onClick={() => sortByProp("foodRatingId", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Id
                        </th>

                        <th onClick={() => sortByProp("foodRatingDescription", "text")} >
                            <img src="icons/sortUpDown16.png" />Description
                        </th>

                        <th onClick={() => sortByProp("foodRatingResturantName", "text")} >
                            <img src="icons/sortUpDown16.png" />Resturant Name
                        </th>

                        <th onClick={() => sortByProp("foodRatingname", "text")} >
                            <img src="icons/sortUpDown16.png" />Food name
                        </th>

                        <th className="textAlignCenter">Image</th>

                        <th onClick={() => sortByProp("foodRatingprice", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Price
                        </th>

                        <th onClick={() => sortByProp("foodRatingwWaitTimeMinute", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Wait time minutes
                        </th>

                        <th onClick={() => sortByProp("foodRatingRate", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Rating
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((listObj, index) =>
                            <tr key={listObj.foodRatingId}>
                                <td>
                                    <a href={'#/foodRatingUpdate/:' + listObj.foodRatingId}><img src="icons/update.png" className="clickLink" /></a>
                                </td>
                                <td className="textAlignCenter" onClick={() => deleteUser(listObj, index)}   >
                                    <img src="icons/delete.png" />
                                </td>
                                <td>{listObj.webUseremail}</td>
                                <td className="textAlignRight">{listObj.foodRatingId}</td>
                                <td>{listObj.foodRatingDescription}</td>
                                <td>{listObj.foodRatingResturantName}</td>
                                <td>{listObj.foodRatingname}</td>
                                <td className="simple textAlignCenter"><img src={listObj.foodRatingimage} /></td>
                                <td className="textAlignRight">{listObj.foodRatingprice}</td>
                                <td className="textAlignRight">{listObj.foodRatingwWaitTimeMinute}</td>
                                <td className="textAlignRight">{listObj.foodRatingRate}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );

}; // function AjaxFoodRating