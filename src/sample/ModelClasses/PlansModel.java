package sample.ModelClasses;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class PlansModel {
    private final IntegerProperty plan_ID;
    private final StringProperty plan_Name;
    private final StringProperty plan_Creation_Time;
    private final IntegerProperty user_ID;
    private final StringProperty user_Login;

    public PlansModel(int plan_ID, String plan_Name, String plan_Creation_Time, int user_ID, String user_Login) {
        this.plan_ID = new SimpleIntegerProperty(plan_ID);
        this.plan_Name = new SimpleStringProperty(plan_Name);
        this.plan_Creation_Time = new SimpleStringProperty(plan_Creation_Time);
        this.user_ID = new SimpleIntegerProperty(user_ID);
        this.user_Login = new SimpleStringProperty(user_Login);
    }

    public int getPlan_ID() {
        return plan_ID.get();
    }

    public IntegerProperty plan_IDProperty() {
        return plan_ID;
    }

    public void setPlan_ID(int plan_ID) {
        this.plan_ID.set(plan_ID);
    }

    public String getPlan_Name() {
        return plan_Name.get();
    }

    public StringProperty plan_NameProperty() {
        return plan_Name;
    }

    public void setPlan_Name(String plan_Name) {
        this.plan_Name.set(plan_Name);
    }

    public String getPlan_Creation_Time() {
        return plan_Creation_Time.get();
    }

    public StringProperty plan_Creation_TimeProperty() {
        return plan_Creation_Time;
    }

    public void setPlan_Creation_Time(String plan_Creation_Time) {
        this.plan_Creation_Time.set(plan_Creation_Time);
    }

    public int getUser_ID() {
        return user_ID.get();
    }

    public IntegerProperty user_IDProperty() {
        return user_ID;
    }

    public void setUser_ID(int user_ID) {
        this.user_ID.set(user_ID);
    }

    public String getUser_Login() {
        return user_Login.get();
    }

    public StringProperty user_LoginProperty() {
        return user_Login;
    }

    public void setUser_Login(String user_Login) {
        this.user_Login.set(user_Login);
    }
}
