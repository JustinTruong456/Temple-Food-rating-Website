package model.foodrating;

public class StringData {
    public String foodRatingId = ""; // auto-increment primary key
    public String foodRatingDescription = ""; // varChar 45, must be unique
    public String foodRatingResturantName = ""; // varChar 45, nullable
    public String foodRatingname = ""; // varChar 45, not null
    public String foodRatingimage = ""; // varChar 200, nullable
    public String foodRatingprice = ""; // decimal(10,2), nullable
    public String foodRatingwWaitTimeMinute = ""; // int(11), nullable
    public String foodRatingRate = ""; // Decimal (4,2), not null
    public String webUserID = ""; // foreign key int(11), nut null

    public String webUseremail = ""; // varChar 45, not null

    public String errorMsg = ""; // not actually in the database, used by the app
                                 // to convey success or failure.

    public int characterCount() {
        String s = this.foodRatingId + this.foodRatingDescription + this.foodRatingResturantName +
                this.foodRatingname + this.foodRatingimage + this.foodRatingprice +
                this.foodRatingwWaitTimeMinute + this.foodRatingRate + this.webUserID + this.webUseremail;
        return s.length();
    }
}
