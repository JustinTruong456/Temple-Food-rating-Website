package model.foodrating;

import java.sql.PreparedStatement;
import java.sql.ResultSet;


import dbUtils.*;

public class DbMods {
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
         * Useful to copy field names from StringData as a reference
         * public String foodRatingId = ""; // auto-increment primary key
         * public String foodRatingDescription = ""; // varChar 45, must be unique
         * public String foodRatingResturantName = ""; // varChar 45, nullable
         * public String foodRatingname = ""; // varChar 45, not null
         * public String foodRatingimage = ""; // varChar 200, nullable
         * public String foodRatingprice = ""; // decimal(10,2), nullable
         * public String foodRatingwWaitTimeMinute = ""; // int(11), nullable
         * public String foodRatingRate = ""; // Decimal (4,2), not null
         * public String webUserID = ""; // foreign key int(11), nut null
         * public String webUseremail = ""; // varChar 45, not null
         */
        // Validation
        errorMsgs.foodRatingDescription = Validate.stringMsg(inputData.foodRatingDescription, 45, true);
        errorMsgs.foodRatingResturantName = Validate.stringMsg(inputData.foodRatingResturantName, 45, false);
        errorMsgs.foodRatingname = Validate.stringMsg(inputData.foodRatingname, 45, true);
        errorMsgs.foodRatingimage = Validate.stringMsg(inputData.foodRatingimage, 200, false);
        errorMsgs.foodRatingprice = Validate.decimalMsg(inputData.foodRatingprice, false);
        errorMsgs.foodRatingwWaitTimeMinute = Validate.integerMsg(inputData.foodRatingwWaitTimeMinute, false);
        errorMsgs.foodRatingRate = Validate.decimalMsg(inputData.foodRatingRate, true);
        errorMsgs.webUserID = Validate.integerMsg(inputData.webUserID, true);
        return errorMsgs;
    } // validate

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
             * String sql =
             * "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
             * "web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * +
             * "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO Food_rating (Food_rating_description, Food_rating_resturant_name, Food_rating_name, Food_rating_image, Food_rating_price, "
                    +
                    "Food_rating_wait_time_minute, Food_rating_rate, web_user_id) values (?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.foodRatingDescription); // string type is simple
            pStatement.setString(2, inputData.foodRatingResturantName);
            pStatement.setString(3, inputData.foodRatingname);
            pStatement.setString(4, inputData.foodRatingimage);
            pStatement.setBigDecimal(5, Validate.convertDecimal(inputData.foodRatingprice));
            pStatement.setInt(6, Validate.convertInteger(inputData.foodRatingwWaitTimeMinute));
            pStatement.setBigDecimal(7, Validate.convertDecimal(inputData.foodRatingRate));
            pStatement.setInt(8, Validate.convertInteger(inputData.webUserID));
            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That Description is already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that foodRatingId has been supplied by the
        // user...
        errorMsgs.foodRatingId = Validate.integerMsg(updateData.foodRatingId, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
             * Useful to copy field names from StringData as a reference
             * public String foodRatingId = ""; // auto-increment primary key
             * public String foodRatingDescription = ""; // varChar 45, must be unique
             * public String foodRatingResturantName = ""; // varChar 45, nullable
             * public String foodRatingname = ""; // varChar 45, not null
             * public String foodRatingimage = ""; // varChar 200, nullable
             * public String foodRatingprice = ""; // decimal(10,2), nullable
             * public String foodRatingwWaitTimeMinute = ""; // int(11), nullable
             * public String foodRatingRate = ""; // Decimal (4,2), not null
             * public String webUserID = ""; // foreign key int(11), nut null
             * public String webUseremail = ""; // varChar 45, not null
             */

            String sql = "UPDATE Food_rating SET Food_rating_description = ?, Food_rating_resturant_name = ?, Food_rating_name = ?, "
                    +
                    "Food_rating_image = ?, Food_rating_price = ?, Food_rating_wait_time_minute = ?, Food_rating_rate = ?, web_user_id = ? WHERE Food_rating_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, updateData.foodRatingDescription); // string type is simple
            pStatement.setString(2, updateData.foodRatingResturantName);
            pStatement.setString(3, updateData.foodRatingname);
            pStatement.setString(4, updateData.foodRatingimage);
            pStatement.setBigDecimal(5, Validate.convertDecimal(updateData.foodRatingprice));
            pStatement.setInt(6, Validate.convertInteger(updateData.foodRatingwWaitTimeMinute));
            pStatement.setBigDecimal(7, Validate.convertDecimal(updateData.foodRatingRate));
            pStatement.setInt(8, Validate.convertInteger(updateData.webUserID));
            pStatement.setInt(9, Validate.convertInteger(updateData.foodRatingId));
            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update OR the web User id (supplied by the client side) does not exist.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That descrption is already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (foodrating): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (foodrating): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {
            String sql = "SELECT Food_rating_id, Food_rating_description, Food_rating_resturant_name, Food_rating_name, Food_rating_image, Food_rating_price, "
                    + "Food_rating_wait_time_minute, Food_rating_rate, Food_rating.web_user_id, web_user.user_email "
                    + "FROM Food_rating, web_user WHERE Food_rating.web_user_id = web_user.web_user_id "
                    + "AND Food_rating_id = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.foodRatingId = Format.fmtInteger(results.getObject("Food_rating_id"));
                sd.foodRatingDescription = Format.fmtString(results.getObject("Food_rating_description"));
                sd.foodRatingResturantName = Format.fmtString(results.getObject("Food_rating_resturant_name"));
                sd.foodRatingname = Format.fmtString(results.getObject("Food_rating_name"));
                sd.foodRatingimage = Format.fmtString(results.getObject("Food_rating_image"));
                sd.foodRatingprice = Format.fmtDollar(results.getObject("Food_rating_price"));
                sd.foodRatingwWaitTimeMinute = Format.fmtInteger(results.getObject("Food_rating_wait_time_minute"));
                sd.foodRatingRate = Format.fmtDecimal(results.getObject("Food_rating_rate"));
                sd.webUserID = Format.fmtInteger(results.getObject("Food_rating.web_user_id"));
                sd.webUseremail = Format.fmtString(results.getObject("web_user.user_email"));

            } else {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.foodrating.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById

    // The return value is found in StringData.errorMsg. Even though a simple String
    // would have been OK to communicate failure (error message) or success (empty
    // string),
    // we pass back a StringData object because our ajax function assumes it's
    // getting the
    // JSON of some object (not just a simple String).
    public static StringData delete(DbConn dbc, String userId) {

        StringData sd = new StringData();

        if (userId == null) {
            sd.errorMsg = "modelfoodrating.DbMods.delete: " +
                    "cannot delete Food_rating_id record because 'Food_rating_id' is null";
            return sd;
        }

        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() > 0) { // cannot proceed, db error
            return sd;
        }

        try {

            String sql = "DELETE FROM Food_rating WHERE Food_rating_id = ?";

            // Compile the SQL (checking for syntax errors against the connected DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, userId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                sd.errorMsg = "Record not deleted - there was no record with Food_rating_id " + userId;
            } else if (numRowsDeleted > 1) {
                sd.errorMsg = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            sd.errorMsg = "The record could not be deleted because a foreign key was pointing to it.\n\nException thrown in model.foodrating.DbMods.delete(): " + e.getMessage();
        }

        return sd;
    }
}
