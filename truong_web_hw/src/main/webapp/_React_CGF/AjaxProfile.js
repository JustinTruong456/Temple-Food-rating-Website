"use strict";

function AjaxProfile() {
    const [msg, setMsg] = React.useState("");

    // Function to fetch profile data
    const fetchProfile = () => {
        var url = "webUser/read";
        console.log("AJAX call to URL: " + url);

        // AJAX call using ajax_alt
        ajax_alt(
            url,
            function (obj) {
                console.log("Ajax Success - got object (see next line).");
                console.log(obj);
                if (obj.errorMsg && obj.errorMsg.length > 0) {
                    setMsg(<strong>{obj.errorMsg}</strong>);
                } else {
                    setMsg(
                        <div>
                            <h2>Welcome Web User {obj.webUserId}</h2>
                            Birthday: {obj.birthday} <br />
                            Membership Fee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleId} {obj.userRoleType} <br />
                            <p><img src={obj.userImage} alt="User" /></p>
                        </div>
                    );
                }
            },
            function (errorMsg) {
                console.log("AJAX error. Here's the message: " + errorMsg);
                setMsg("ajax failure: " + errorMsg);
            }
        );
    };

    // useEffect hook to call fetchProfile only once when the component mounts
    React.useEffect(() => {
        fetchProfile(); // Call the function to make the AJAX call
    }, []); // Empty dependency array means this effect runs once

    return (
        <div className="logon">
            <div>{msg}</div>
        </div>
    );
} // function function AjaxProfile () {
