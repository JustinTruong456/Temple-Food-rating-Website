package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.foodrating.*;
import dbUtils.*;

public class FoodRatingView {

    public static StringDataList getAllFoodrating(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT *, web_user.user_email "
                    + "FROM Food_rating "
                    + "JOIN web_user ON Food_rating.web_user_id = web_user.web_user_id "
                    + "ORDER BY Food_rating_id ";  // always order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the Format methods do not throw exceptions. If they find illegal data (like you 
                // tried to format a date as an integer), they return an error message (instead of 
                // returning the formatted value). So, you'll see these error messages right in the 
                // API output (JSON data) and/or you'll see it on the page in the UI.

                sd.foodRatingId = Format.fmtInteger(results.getObject("Food_rating_id"));
                sd.foodRatingDescription = Format.fmtString(results.getObject("Food_rating_description"));
                sd.foodRatingResturantName = Format.fmtString(results.getObject("Food_rating_resturant_name"));
                sd.foodRatingname = Format.fmtString(results.getObject("Food_rating_name"));
                sd.foodRatingimage = Format.fmtString(results.getObject("Food_rating_image"));
                sd.foodRatingprice = Format.fmtDollar(results.getObject("Food_rating_price"));
                sd.foodRatingwWaitTimeMinute = Format.fmtInteger(results.getObject("Food_rating_wait_time_minute"));
                sd.foodRatingRate = Format.fmtDecimal(results.getObject("Food_rating_rate"));
                sd.webUserID = Format.fmtInteger(results.getObject("web_user_id"));
                sd.webUseremail = Format.fmtString(results.getObject("web_user.user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in FoodRatingView.getAllFoodRating(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
